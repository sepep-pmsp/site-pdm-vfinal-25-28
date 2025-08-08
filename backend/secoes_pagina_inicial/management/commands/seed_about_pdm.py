from django.core.management.base import BaseCommand
from secoes_pagina_inicial.models import AboutPDM, ParagrafoAbout
from cadastros_basicos.queries.prefeito import get_prefeito_by_name
from secoes_pagina_inicial.queries.carta_prefeito import get_carta_prefeito_by_titulo_and_name
from datetime import datetime
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

class Command(BaseCommand):
    help = "Seed para seção Sobre o PDM da página inicial"
    json_file = 'about_pdm.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **kwargs):

        about_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        prefeito = get_prefeito_by_name(about_data['prefeito_nome'])
        titulo_carta = about_data['titulo_carta_prefeito']

        carta_prefeito = get_carta_prefeito_by_titulo_and_name(titulo_carta, prefeito.nome)

        if AboutPDM.objects.filter(titulo=about_data['titulo'], subtitulo=about_data['subtitulo']).exists():
            self.stdout.write(self.style.WARNING(f"Seção Sobre o PDM da página inicial com o título  {about_data['titulo']} já existe, não foi criada novamente."))
            return

        about_obj, created = AboutPDM.objects.get_or_create(
            titulo=about_data['titulo'],
            subtitulo=about_data['subtitulo'],
            carta_do_prefeito=carta_prefeito,
            criado_por=superuser,
            criado_em=data_hoje,
            modificado_por=superuser,
            modificado_em=data_hoje,
            published=True
        )

        
        if created:
            for i, paragrafo in enumerate(about_data['paragrafos']):
                ParagrafoAbout.objects.create(
                    sobre_pdm=about_obj,
                    conteudo=paragrafo,
                    ordem=i + 1
                )

            self.stdout.write(self.style.SUCCESS(f"Seção Sobre o PDM da página inicial '{about_obj.titulo}' criada com sucesso."))
        else:
            self.stdout.write(self.style.WARNING(f"Seção Sobre o PDM da página inicial '{about_obj.titulo}' já existe, não foi criada novamente."))

        self.stdout.write(self.style.SUCCESS("Seed de seções Sobre o PDM concluído com sucesso."))