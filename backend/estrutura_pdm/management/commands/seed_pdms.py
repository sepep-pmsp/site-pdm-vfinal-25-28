import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.pdm import TipoDocumentoPDM
from estrutura_pdm.models.pdm import PDM, DocumentoPDM
from cadastros_basicos.models.estrutura_administrativa import Prefeito
from django.core.files import File
from cadastros_basicos.queries.prefeito import get_prefeito_by_name
from cadastros_basicos.queries.superuser import get_superuser
from static_files.models import Imagem
from estrutura_pdm.queries.pdms import get_tipo_doc_pdm_by_nome
from typing import Literal


class Command(BaseCommand):
    json_file = "pdms.json"
    help  = "Seed para Programas de Metas"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __build_image_path(self, image_fname:str) -> str:
        
        folder_imagem = os.path.join("estrutura_pdm", "data", "imgs", "imgs_pdms")
        return os.path.join(folder_imagem, image_fname)


    def __create_image(self, pdm_obj:dict, img_key:Literal['logo', 'capa']) -> Imagem | None:

        image_fname = pdm_obj.get(img_key)
        if not image_fname:
            self.stdout.write(self.style.WARNING(f'Imagem do tipo {img_key} não encontrada no objeto PDM.'))
            return None
        image_path=self.__build_image_path(image_fname)

        super_user = get_superuser()

        if Imagem.objects.filter(arquivo=image_path).exists():
            self.stdout.write(self.style.WARNING(f'Imagem {image_path} já existe.'))
            return Imagem.objects.get(arquivo=image_path)

        image_data = {
            "titulo" : f"{img_key.capitalize()} - PDM {pdm_obj['ano_inicio']}/PDM {pdm_obj['ano_fim']}",
            "descricao": f"Imagem de {img_key.capitalize()} do PDM {pdm_obj['nome']}",
            "arquivo": File(open(image_path, 'rb')),
            "enviado_por" : super_user,
        }

        imagem, created = Imagem.objects.get_or_create(**image_data)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Imagem {imagem.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Imagem {imagem.titulo} já existe.'))

        return imagem
    
    def create_documentos(self, pdm_obj:dict, pdm:PDM)->None:

        documentos = pdm_obj.get('documentos', [])
        if not documentos:
            self.stdout.write(self.style.WARNING(f'Nenhum documento encontrado para o PDM {pdm.nome}.'))
            return

        for doc in documentos:

            tipo_doc: TipoDocumentoPDM | None = get_tipo_doc_pdm_by_nome(doc['tipo'], raise_error=False)
            if tipo_doc is None:
                self.stdout.write(self.style.WARNING(f'Tipo de documento {doc["tipo"]} não encontrado. Criando novo tipo.'))
                TipoDocumentoPDM.objects.create(nome=doc['tipo'], descricao=doc.get('descricao'))
                continue

            doc_data = {
                'nome': doc['nome'],
                'url': doc['url'],
                'tipo': tipo_doc,
                'pdm': pdm
            }


            documento, created = DocumentoPDM.objects.get_or_create(**doc_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Documento {documento.nome} criado com sucesso.'))
            else:
                self.stdout.write(self.style.WARNING(f'Documento {documento.nome} já existe.'))
    

    def get_prefeito(self, pdm_obj:dict)->Prefeito:

        nome_prefeito = pdm_obj.get('nome_prefeito')

        if nome_prefeito is None:
            self.stdout.write(self.style.ERROR('Nome do prefeito não encontrado no objeto PDM.'))
            raise ValueError('Nome do prefeito não encontrado no objeto PDM.')

        prefeito = get_prefeito_by_name(nome_prefeito, raise_error=False)
        if prefeito is None:
            self.stdout.write(self.style.ERROR(f'Prefeito {nome_prefeito} não encontrado.'))
            raise ValueError(f'Prefeito {nome_prefeito} não encontrado.')

        return prefeito

    def create_pdm(self, pdm_obj:dict) -> PDM:

        prefeito = self.get_prefeito(pdm_obj)

        img_logo = self.__create_image(pdm_obj, 'logo')
        img_capa = self.__create_image(pdm_obj, 'capa')

        pdm_data = {
            'nome' : pdm_obj['nome'],
            'descricao' : pdm_obj['descricao'],
            'ano_inicio' : pdm_obj['ano_inicio'],
            'ano_fim' : pdm_obj['ano_fim'],
            'prefeito' : prefeito

        }

        img_logo = self.__create_image(pdm_obj, 'logo')
        if img_logo:
            pdm_data['logo'] = img_logo

        img_capa = self.__create_image(pdm_obj, 'capa')
        if img_capa:
            pdm_data['capa'] = img_capa

        pdm, created = PDM.objects.get_or_create(**pdm_data)
        if created:
            self.create_documentos(pdm_obj, pdm)
            self.stdout.write(self.style.SUCCESS(f'PDM {pdm.nome} criado com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'PDM {pdm.nome} já existe.'))
        return pdm



    def handle(self, *args, **options):
        json_data = self.__load_json()
        for pdm_obj in json_data:

            if PDM.objects.filter(nome=pdm_obj["nome"]).exists():
                self.stdout.write(self.style.WARNING(f'PDM {pdm_obj["nome"]} já existe. Pulando criação.'))
                continue

            self.create_pdm(pdm_obj)