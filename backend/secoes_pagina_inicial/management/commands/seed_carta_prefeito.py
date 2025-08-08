from django.core.management.base import BaseCommand
from cadastros_basicos.models.estrutura_administrativa import Prefeito
from cadastros_basicos.queries.prefeito import get_prefeito_by_name
from secoes_pagina_inicial.models import CartaPrefeito, ParagrafoCartaPrefeito
from datetime import datetime
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

class Command(BaseCommand):
    help = "Seed para Carta do Prefeito"
    json_file = 'carta_do_prefeito.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __format_date(self, date_str: str) -> datetime:
        return datetime.strptime(date_str, "%Y-%m-%d").date()

    def handle(self, *args, **kwargs):

        carta_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        prefeito = get_prefeito_by_name(carta_data['prefeito_nome'])

        if CartaPrefeito.objects.filter(titulo=carta_data['titulo'], prefeito=prefeito).exists():
            self.stdout.write(self.style.WARNING(f"Carta do Prefeito {prefeito.nome} '{carta_data['titulo']}' já existe, não foi criada novamente."))
            return

        carta_obj, created = CartaPrefeito.objects.get_or_create(
            titulo=carta_data['titulo'],
            subtitulo=carta_data['subtitulo'],
            prefeito=prefeito,
            data_assinatura=self.__format_date(carta_data['assinatura']),
            criado_por=superuser,
            criado_em=data_hoje,
            modificado_por=superuser,
            modificado_em=data_hoje,
            published=True
        )

        
        if created:
            for i, paragrafo in enumerate(carta_data['paragrafos']):
                ParagrafoCartaPrefeito.objects.create(
                    carta_do_prefeito=carta_obj,
                    conteudo=paragrafo,
                    ordem=i + 1
                )

            self.stdout.write(self.style.SUCCESS(f"Carta do Prefeito {carta_obj.prefeito.nome} '{carta_obj.titulo}' criada com sucesso."))
        else:
            self.stdout.write(self.style.WARNING(f"Carta do Prefeito {carta_obj.prefeito.nome} '{carta_obj.titulo}' já existe, não foi criada novamente."))

        self.stdout.write(self.style.SUCCESS("Seed de cartas do prefeito concluído com sucesso."))