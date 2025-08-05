
import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.regionalizacao import SubPrefeitura, Distrito
from cadastros_basicos.queries.regionalizacao import get_subprefeitura_by_cd_geosampa


class Command(BaseCommand):
    json_file = "distritos.json"
    help = "Seed para distritos"

    def __load_json(self)->dict:

        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r") as file:
            data = json.load(file)
        return data

    def __parse_data(self, obj:dict)->dict[str, str]:

        properties = obj['properties']
        parsed = {
            'nome' : properties['nm_distrito_municipal'],
            'sigla' : properties['sg_distrito_municipal'],
            'cd_subprefeitura_geosampa' : properties['cd_identificador_subprefeitura'],
            'cd_geosampa' : int(properties['cd_distrito_municipal'])
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

            cd_subprefeitura = int(item['cd_subprefeitura_geosampa'])
            subprefeitura = get_subprefeitura_by_cd_geosampa(cd_subprefeitura, raise_error=False)
            if not subprefeitura:
                self.stdout.write(self.style.ERROR(f'Subprefeitura com código {cd_subprefeitura} não encontrada.'))
                continue

            distrito, created = Distrito.objects.get_or_create(
                nome=item['nome'],
                sigla=item['sigla'],
                subprefeitura=subprefeitura,
                cd_geosampa=item['cd_geosampa'],
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Distrito {distrito.nome} criado.'))
            else:
                self.stdout.write(self.style.WARNING(f'Distrito {distrito.nome} já existe.'))

    def handle(self, *args, **kwargs):
        self.__pipeline()
        self.stdout.write(self.style.SUCCESS('Seed de distritos concluída.'))

        

        