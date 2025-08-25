
import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.regionalizacao import SubPrefeitura, Zona
from cadastros_basicos.queries.regionalizacao import get_subprefeitura_by_cd_geosampa, get_zona_by_sigla


class Command(BaseCommand):
    json_file = "zonas.json"
    help = "Seed para zonas"

    def __load_json(self)->dict:

        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def vincular_subprefeitura(self, zona_obj:Zona, cd_subprefeitura:int):

        subprefeitura = get_subprefeitura_by_cd_geosampa(cd_subprefeitura, raise_error=False)
        if not subprefeitura:
            self.stdout.write(self.style.ERROR(f'Subprefeitura com código {cd_subprefeitura} não encontrada.'))
            return None
        subprefeitura.zona = zona_obj
        subprefeitura.save()

    
    def __pipeline(self):

        data = self.__load_json()

        for item in data:

            zona = get_zona_by_sigla(item['sigla'], raise_error=False)
            if zona:
                self.stdout.write(self.style.WARNING(f'Zona com sigla {item["sigla"]} já criada. Pulando criação.'))
                continue

            zona, created = Zona.objects.get_or_create(
                nome=item['nome'],
                sigla=item['sigla']
            )
            if created:
                for cd_subprefeitura in item['codigos_subprefeituras']:
                    self.vincular_subprefeitura(zona, cd_subprefeitura)
                self.stdout.write(self.style.SUCCESS(f'Zona {zona.nome} criada.'))
            else:
                self.stdout.write(self.style.WARNING(f'Zona {zona.nome} já existe.'))

    def handle(self, *args, **kwargs):
        self.__pipeline()
        self.stdout.write(self.style.SUCCESS('Seed de zonas concluída.'))

        

        