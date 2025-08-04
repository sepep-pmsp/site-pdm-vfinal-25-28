
import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.regionalizacao import SubPrefeitura, Distrito


class Command(BaseCommand):
    json_file = "subprefeituras.json"
    help = "Seed para subprefeituras"

    def __load_json(self)->dict:

        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r") as file:
            data = json.load(file)
        return data

    def __parse_data(self, obj:dict)->dict[str, str]:

        properties = obj['properties']
        parsed = {
            'nome' : properties['nm_subprefeitura'],
            'sigla' : properties['sg_subprefeitura']
        }

        return parsed

    
    def __parse_geojson_data(self, data)->list[dict[str, str]]:

        dados = data['features']
        parsed_data = []
        for obj in dados:
            parsed = self.__parse_data(obj)
            parsed_data.append(parsed)

        return parsed_data
    
    def __pipeline(self):

        data = self.__load_json()
        parsed_data = self.__parse_geojson_data(data)

        for item in parsed_data:
            subprefeitura, created = SubPrefeitura.objects.get_or_create(
                nome=item['nome'],
                sigla=item['sigla']
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Subprefeitura {subprefeitura.nome} criada.'))
            else:
                self.stdout.write(self.style.WARNING(f'Subprefeitura {subprefeitura.nome} já existe.'))

    def handle(self, *args, **kwargs):
        self.__pipeline()
        self.stdout.write(self.style.SUCCESS('Seed de subprefeituras concluída.'))

        

        