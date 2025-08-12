from cadastros_basicos.models.estrutura_administrativa import Orgao, TipoOrgao
import json
import os
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    json_file = "secretarias.json"
    help = "Seed para secretarias"

    def __load_json(self)->dict:

        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r") as file:
            data = json.load(file)
        return data
    
    def __solve_tipo_orgao(self, item:dict)->TipoOrgao:

        if item.get('indireta', False):
            return TipoOrgao.INDIRETA
        return TipoOrgao.DIRETA
    
    def __pipeline(self):

        data = self.__load_json()

        for item in data:

        
            orgao, created = Orgao.objects.get_or_create(
                nome=item['nome'],
                sigla=item['sigla'],
                tipo=self.__solve_tipo_orgao(item)
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Órgão {orgao.nome} criado.'))
            else:
                self.stdout.write(self.style.WARNING(f'Órgão {orgao.nome} já existe.'))

    def handle(self, *args, **kwargs):
        self.__pipeline()
        self.stdout.write(self.style.SUCCESS('Seed de órgãos concluída.'))

        

        