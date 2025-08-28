from django.core.management.base import BaseCommand
from secoes_pagina_inicial.models import SecaoRegionalizacao, ParagrafoSecaoRegionalizacao
from datetime import datetime
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

class Command(BaseCommand):
    help = "Seed para seção de Regionalização da página inicial"
    json_file = 'regionalizacao.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **kwargs):

        regionalizacao_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        titulo = regionalizacao_data['titulo']
        subtitulo = regionalizacao_data['subtitulo']
        instrucao = regionalizacao_data['instrucao']
        link_arquivo = regionalizacao_data['link_arquivo']
        link_dashboard = regionalizacao_data['link_dashboard']

        if SecaoRegionalizacao.objects.filter(titulo=titulo).exists():
            self.stdout.write(self.style.WARNING(f"Seção Regionalização com o título  {titulo} já existe, não foi criada novamente."))
            return

        regionalizacao_obj, created = SecaoRegionalizacao.objects.get_or_create(
            titulo=titulo,
            subtitulo=subtitulo,
            instrucao=instrucao,
            link_arquivo=link_arquivo,
            link_dashboard=link_dashboard,
            criado_por=superuser,
            criado_em=data_hoje,
            modificado_por=superuser,
            modificado_em=data_hoje,
            published=True
        )

        
        if created:
            for i, paragrafo in enumerate(regionalizacao_data['paragrafos']):
                ParagrafoSecaoRegionalizacao.objects.create(
                    secao_regionalizacao=regionalizacao_obj,
                    conteudo=paragrafo,
                    ordem=i + 1
                )

            self.stdout.write(self.style.SUCCESS(f"Seção Regionalização da página inicial '{regionalizacao_obj.titulo}' criada com sucesso."))
        else:
            self.stdout.write(self.style.WARNING(f"Seção Regionalização da página inicial '{regionalizacao_obj.titulo}' já existe, não foi criada novamente."))

        self.stdout.write(self.style.SUCCESS("Seed de seções Regionalização concluído com sucesso."))