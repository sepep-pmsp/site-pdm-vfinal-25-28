
import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.estrutura_administrativa import Prefeito
from datetime import datetime

class Command(BaseCommand):
    json_file = "prefeito.json"
    help = "Seed para Prefeito"

    def __load_json(self)->dict:

        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __format_date(self, date_str: str) -> datetime:
        return datetime.strptime(date_str, "%Y-%m-%d").date()

    def __parse_data(self, obj:dict)->dict[str, str]:

        parsed = {
            "nome" : obj['nome'],
            "partido" : obj['partido'],
            "mandato_inicio" : self.__format_date(obj['mandato_inicio']),
            "mandato_fim" : self.__format_date(obj['mandato_fim'])
        }

        return parsed

    
    def __pipeline(self):

        data = self.__load_json()

        for prefeito in data:

            parsed_data = self.__parse_data(prefeito)

            if Prefeito.objects.filter(nome=parsed_data['nome'], partido=parsed_data['partido']).exists():
                self.stdout.write(self.style.WARNING(f'Prefeito {parsed_data["nome"]} já existe.'))
                continue

            prefeito, created = Prefeito.objects.get_or_create(
                **parsed_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Prefeito {prefeito.nome} criado.'))
            else:
                self.stdout.write(self.style.WARNING(f'Prefeito {prefeito.nome} já existe.'))

    def handle(self, *args, **kwargs):
        self.__pipeline()
        self.stdout.write(self.style.SUCCESS('Seed de prefeito concluída.'))

        

        