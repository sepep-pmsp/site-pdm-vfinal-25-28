import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.eixos.eixos_estrategicos import Eixo
from estrutura_pdm.models.eixos.temas import Tema
from django.core.files import File
from cadastros_basicos.queries.superuser import get_superuser
from static_files.models import Imagem
from typing import Literal


class Command(BaseCommand):
    json_file = "eixos.json"
    help  = "Seed para eixos e temas"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __build_image_path(self, image_fname:str, tipo_imagem:Literal['colorido', 'branco']) -> str:
        
        folder_tipo = f"logos_eixos_{tipo_imagem}s"
        folder_imagem = os.path.join("estrutura_pdm", "data", "media", folder_tipo)
        return os.path.join(folder_imagem, image_fname)


    def __create_image(self, eixo_obj:dict, tipo_imagem:Literal['colorido', 'branco']) -> Imagem:
        
        image_name = eixo_obj[f"logo_{tipo_imagem}_path"]
        image_path=self.__build_image_path(image_name, tipo_imagem)

        super_user = get_superuser()

        if Imagem.objects.filter(arquivo=image_path).exists():
            self.stdout.write(self.style.WARNING(f'Imagem {image_name} já existe.'))
            return Imagem.objects.get(arquivo=image_path)

        image_data = {
            "titulo" : f"Logo {tipo_imagem.capitalize()} - {eixo_obj['nome']}",
            "descricao": f"Logo {tipo_imagem.capitalize()} do eixo {eixo_obj['nome']}",
            "arquivo": File(open(image_path, 'rb')),
            "enviado_por" : super_user,
        }

        imagem, created = Imagem.objects.get_or_create(**image_data)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Imagem {imagem.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Imagem {imagem.titulo} já existe.'))

        return imagem
    
    def create_tema(self, tema_obj:dict, order:int, eixo:Eixo) -> Tema:  
        tema_data = {
            "nome": tema_obj["nome"],
            "descricao": tema_obj["descricao"],
            "eixo": eixo,
            "order": order
        }
        tema, created = Tema.objects.get_or_create(**tema_data)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Tema {tema.nome} vinculado ao eixo {eixo.nome} criado com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Tema {tema.nome} vinculado ao eixo {eixo.nome} já existe.'))
        return tema

    def __parse_data_eixo(self, eixo_obj:dict) -> dict:

        logo_branco: Imagem = self.__create_image(eixo_obj, "branco")
        logo_colorido: Imagem = self.__create_image(eixo_obj, "colorido")

        parsed = {
            "nome": eixo_obj["nome"],
            "titulo": eixo_obj["titulo"],
            "descricao": eixo_obj["descricao"],
            "resumo": eixo_obj["resumo"],
            "logo_colorido": logo_colorido,
            "logo_branco": logo_branco,
            "cor_principal": eixo_obj["hex_cor_principal"],
            "ordem": int(eixo_obj["ordem"]),
        }

        return parsed

    def handle(self, *args, **options):
        json_data = self.__load_json()
        for eixo_data in json_data:

            if Eixo.objects.filter(nome=eixo_data["nome"]).exists():
                self.stdout.write(self.style.WARNING(f'Eixo {eixo_data["nome"]} já existe. Pulando criação.'))
                continue

            parsed_eixo = self.__parse_data_eixo(eixo_data)
            eixo, created = Eixo.objects.get_or_create(
                **parsed_eixo
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Eixo {eixo.nome} criado com sucesso.'))
            else:
                self.stdout.write(self.style.WARNING(f'Eixo {eixo.nome} já existe.'))

            for i, tema_data in enumerate(eixo_data["temas"]):
                ordem = i + 1
                tema = self.create_tema(tema_data, ordem, eixo)