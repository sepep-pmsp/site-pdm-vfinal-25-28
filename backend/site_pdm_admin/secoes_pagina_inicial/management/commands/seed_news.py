from django.core.management.base import BaseCommand
from secoes_pagina_inicial.models import Noticia
from datetime import datetime
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

class Command(BaseCommand):
    help = "Seed para notícias de exemplo"
    json_file = 'noticias.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __format_date(self, date_str: str) -> datetime:
        return datetime.strptime(date_str, "%Y-%m-%d").date()

    def handle(self, *args, **kwargs):

        noticias_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        for noticia in noticias_data:

            if Noticia.objects.filter(titulo=noticia['titulo']).exists():
                self.stdout.write(self.style.WARNING(f"Notícia '{noticia['titulo']}' já existe, não foi criada novamente."))
                continue

            obj, created = Noticia.objects.get_or_create(
                titulo=noticia['titulo'],
                link=noticia['link'],
                colocar_no_topo=noticia['colocar_no_topo'],
                data=self.__format_date(noticia['data']),
                criado_por=superuser,
                criado_em=data_hoje,
                modificado_por=superuser,
                modificado_em=data_hoje,
                published=noticia['published']
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f"Notícia '{obj.titulo}' criada com sucesso."))
            else:
                self.stdout.write(self.style.WARNING(f"Notícia '{obj.titulo}' já existe, não foi criada novamente."))

        self.stdout.write(self.style.SUCCESS("Seed de notícias concluído com sucesso."))