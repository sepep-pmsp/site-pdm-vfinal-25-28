import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.metas import Meta
from estrutura_pdm.queries.metas import get_meta_by_numero
from cadastros_basicos.queries.ods import get_ods_by_numero



class Command(BaseCommand):
    json_file = "metas_ods.json"
    help  = "Seed para vinculação das Metas aos ODS"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **options):
        json_data = self.__load_json()
        for meta, ods_num_list in json_data.items():
            meta_num = int(meta)
            meta_obj = get_meta_by_numero(meta_num)
            for ods_num in ods_num_list:
                ods_obj = get_ods_by_numero(ods_num)
                try:
                    meta_obj.ods_relacionados.add(ods_obj)
                    self.stdout.write(self.style.SUCCESS(f'Vinculado ODS {ods_obj.numero} à Meta {meta_obj.numero}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Erro ao vincular ODS {ods_obj.numero} à Meta {meta_obj.numero}: {e}'))