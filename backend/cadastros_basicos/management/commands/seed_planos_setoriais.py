
import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.vinculos_externos import PlanoSetorial


class Command(BaseCommand):
    json_file = "planos.json"
    help = "Seed para planos setoriais"

    def __load_json(self)->dict:

        file_path = os.path.join("cadastros_basicos/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data


    
    def __pipeline(self):

        data = self.__load_json()

        for item in data:
            plano_setorial, created = PlanoSetorial.objects.get_or_create(
                nome=item['nome'],
                descricao=item['descricao']
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Plano Setorial {plano_setorial.nome} criado.'))
            else:
                self.stdout.write(self.style.WARNING(f'Plano Setorial {plano_setorial.nome} já existe.'))

    def handle(self, *args, **kwargs):
        self.__pipeline()
        self.stdout.write(self.style.SUCCESS('Seed de planos setoriais concluída.'))

        

        