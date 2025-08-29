from django.core.management.base import BaseCommand
import os
import json
from devolutivas.models.secao import SecaoParticipacao, SubSecaoApresentacao, ParagrafoApresentacao
from cadastros_basicos.queries.superuser import get_superuser
from django.core.files import File
from static_files.models import Imagem


class Command(BaseCommand):
    json_file = "secao.json"
    help  = "Seed para Seção Participação do Devolutivas"

    def __load_json(self) -> dict:
        file_path = os.path.join("devolutivas/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __build_image_path(self, image_fname:str) -> str:
        
        folder_imagem = os.path.join("devolutivas", "data", "imgs")
        return os.path.join(folder_imagem, image_fname)
    
    def __create_image(self, image_name:str, desc:str) -> Imagem:
        
        image_path=self.__build_image_path(image_name)

        super_user = get_superuser()

        if Imagem.objects.filter(arquivo=image_path).exists():
            self.stdout.write(self.style.WARNING(f'Imagem {image_name} já existe.'))
            return Imagem.objects.get(arquivo=image_path)

        image_data = {
            "titulo" : desc,
            "descricao": f"Imagem {desc} da seção Devolutivas",
            "arquivo": File(open(image_path, 'rb')),
            "enviado_por" : super_user,
        }

        imagem, created = Imagem.objects.get_or_create(**image_data)
        if created:
            self.stdout.write(self.style.SUCCESS(f'Imagem {imagem.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Imagem {imagem.titulo} já existe.'))

        return imagem
    

    def handle(self, *args, **options):
        secao_data = self.__load_json()


        secao_obj, created = SecaoParticipacao.objects.get_or_create(
            titulo=secao_data['titulo'],
            subtitulo=secao_data['subtitulo'],
            imagem=self.__create_image(secao_data['imagem'],'Seção Devolutivas'),
            subtitulo_box=secao_data['subtitulo_box'],
            texto_box=secao_data['texto_box'],
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'Secção de Participação {secao_obj.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'Secção de Participação {secao_obj.titulo} já existe.'))


        modal = secao_data['apresentacao']

        modal_obj, created = SubSecaoApresentacao.objects.get_or_create(
            titulo=modal['titulo'],
            subtitulo=modal['subtitulo'],
            texto=modal['texto'],
            imagem=self.__create_image(modal['imagem'],'Modal Apresentação Seção Devolutivas'),
            secao=secao_obj

        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'SubSeção de Apresentação {modal_obj.titulo} criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'SubSeção de Apresentação {modal_obj.titulo} já existe.'))

        for paragrafo in modal['paragrafos']:
            paragrafo_obj, created = ParagrafoApresentacao.objects.get_or_create(
                conteudo=paragrafo,
                apresentacao=modal_obj
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Parágrafo da Apresentação criado com sucesso.'))
            else:
                self.stdout.write(self.style.WARNING(f'Parágrafo da Apresentação já existe.'))
        


        self.stdout.write(self.style.SUCCESS('Seed de Seção Participação do Devolutivas finalizado com sucesso.'))
