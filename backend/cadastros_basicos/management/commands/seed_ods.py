import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.vinculos_externos import ODS
from django.core.files import File
from cadastros_basicos.queries.superuser import get_superuser
from static_files.models import Imagem
from typing import Literal


class Command(BaseCommand):
    json_file = "ods.json"
    help  = "Seed para ODS"

    def __load_json(self) -> dict:
        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __build_image_path(self, image_rel_path:str) -> str:
        
        img_path = os.path.join("cadastros_basicos", "data", "imgs", image_rel_path)
        return img_path


    def __create_image(self, ods_obj:dict, tipo_imagem:Literal['logo_colorido', 'logo_branco'], super_user) -> Imagem:

        img_rel_path = ods_obj[tipo_imagem]
        image_path=self.__build_image_path(img_rel_path)

        img_name = os.path.basename(image_path)
        if Imagem.objects.filter(arquivo=image_path).exists():
            self.stdout.write(self.style.WARNING(f'Imagem {img_name} já existe.'))
            return Imagem.objects.get(arquivo=image_path)

        image_data = {
            "titulo" : f"Logo {tipo_imagem.capitalize()} - {ods_obj['nome']}",
            "descricao": f"Logo {tipo_imagem.capitalize()} do ODS {ods_obj['nome']}",
            "arquivo": File(open(image_path, 'rb')),
            "enviado_por" : super_user,
        }

        imagem, created = Imagem.objects.get_or_create(**image_data)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Imagem {imagem.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Imagem {imagem.titulo} já existe.'))

        return imagem

    def __parse_data_ods(self, ods_obj:dict, super_user) -> dict:


        parsed = {
            "nome": ods_obj["nome"],
            "numero" : ods_obj["numero"],
            "descricao": ods_obj["descricao"],
            "cor_principal": ods_obj["cor_principal"],
        }

        logos = {}
        for tipo_logo in ('logo_colorido', 'logo_branco'):
            if ods_obj.get(tipo_logo):
                logos[tipo_logo] = self.__create_image(ods_obj, tipo_logo, super_user)

        parsed.update(logos)

        return parsed

    def handle(self, *args, **options):
        json_data = self.__load_json()
        super_user = get_superuser()

        for ods_data in json_data:

            if ODS.objects.filter(nome=ods_data["nome"]).exists():
                self.stdout.write(self.style.WARNING(f'ODS {ods_data["nome"]} já existe. Pulando criação.'))
                continue

            parsed_ods = self.__parse_data_ods(ods_data, super_user)
            ods, created = ODS.objects.get_or_create(
                **parsed_ods
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'ODS {ods.nome} criado com sucesso.'))
            else:
                self.stdout.write(self.style.WARNING(f'ODS {ods.nome} já existe.'))
