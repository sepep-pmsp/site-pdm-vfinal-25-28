import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.metas import Meta
from estrutura_pdm.queries.metas import get_meta_by_numero
from estrutura_pdm.queries.eixos import get_tema_by_nome



class Command(BaseCommand):
    json_file = "metas_tema.json"
    help  = "Seed para vinculação das Metas aos Temas"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **options):
        json_data = self.__load_json()
        for meta, tema_nome in json_data.items():
            meta_num = int(meta)
            meta_obj = get_meta_by_numero(meta_num)
            tema_obj = get_tema_by_nome(tema_nome)
            try:
                meta_obj.tema = tema_obj
                meta_obj.save()
                self.stdout.write(self.style.SUCCESS(f'Vinculado Tema {tema_obj.nome} à Meta {meta_obj.numero}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Erro ao vincular Tema {tema_obj.nome} à Meta {meta_obj.numero}: {e}'))
               