import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.metas import Meta, MapaMetaAbstract
from estrutura_pdm.models.metas.relacionamentos_meta import StatusRegionalizacao
from estrutura_pdm.queries.metas import get_meta_by_numero, get_mapa
from cadastros_basicos.queries.superuser import get_superuser
from static_files.models import Imagem
from django.core.files import File



class Command(BaseCommand):
    json_file = "metas_mapas.json"
    help  = "Seed para vinculação dos Mapas às Metas Regionalizadas"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def __build_image_path(self, image_fname:str) -> str:
        
        return os.path.join("estrutura_pdm", "data", "imgs", "mapas", image_fname)

    def __create_map_image(self, image_path:str, meta_num:int)->Imagem:

        super_user = get_superuser()

        fpath = self.__build_image_path(image_path)

        image_data = {
            "titulo" : f"Mapa da Meta {meta_num} - {os.path.basename(fpath)}",
            "descricao": f"Mapa associado à meta {meta_num}",
            "arquivo": File(open(fpath, 'rb')),
            "enviado_por" : super_user,
        }

        imagem, created = Imagem.objects.get_or_create(**image_data)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Imagem {imagem.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Imagem {imagem.titulo} já existe.'))

        return imagem

    def handle(self, *args, **options):
        json_data = self.__load_json()
        for meta_data in json_data:
            meta_num = int(meta_data['meta_numero'])

            status = meta_data['status_regionalizacao']
            if status == StatusRegionalizacao.NAO_REGIONALIZAVEL:
                self.stdout.write(self.style.SUCCESS(f'Meta {meta_num} é não regionalizável. Pulando...'))
                continue

            meta_obj = get_meta_by_numero(meta_num, raise_error=True)
            meta_obj.status_regionalizacao = meta_data['status_regionalizacao']
            meta_obj.save()

            if meta_obj.status_regionalizacao  == StatusRegionalizacao.REGIONALIZAVEL:
                
                if get_mapa(meta_obj, raise_error=False) is not None:
                    self.stdout.write(self.style.SUCCESS(f'Meta Regionalizável {meta_num} já possui Mapa associado. Pulando...'))
                    continue

                map_obj = MapaMetaAbstract(
                    meta=meta_obj,
                    map_image=None,
                    indicador_legenda=None,
                    nota_rodape=None,
                    frase_regionalizacao=meta_data['nota_regionalizacao']
                )

                map_obj.save()
                self.stdout.write(self.style.SUCCESS(f'Criado relacionamento de Mapa para Meta Regionalizável {meta_num}'))
            elif meta_obj.status_regionalizacao ==  StatusRegionalizacao.REGIONALIZADA:
                
                if get_mapa(meta_obj, raise_error=False) is not None:
                    self.stdout.write(self.style.SUCCESS(f'Meta Regionalizável {meta_num} já possui Mapa associado. Pulando...'))
                    continue

                map_obj = MapaMetaAbstract(
                    meta=meta_obj,
                    map_image=self.__create_map_image(meta_data['mapa_file'], meta_num),
                    indicador_legenda=meta_data['indicador_legenda'],
                    nota_rodape=meta_data['nota_rodape'],
                    frase_regionalizacao=None
                )

                map_obj.save()
                self.stdout.write(self.style.SUCCESS(f'Atualizado relacionamento de Mapa para Meta Regionalizada {meta_num}'))