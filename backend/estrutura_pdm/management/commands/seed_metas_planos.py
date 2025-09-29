import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.metas import Meta
from estrutura_pdm.queries.metas import get_meta_by_numero
from cadastros_basicos.queries.planos_setoriais import get_plano_by_nome



class Command(BaseCommand):
    json_file = "metas_planos.json"
    help  = "Seed para vinculação das Metas aos Planos Setoriais"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **options):
        json_data = self.__load_json()
        for meta, plano_nome_list in json_data.items():
            meta_num = int(meta)
            meta_obj = get_meta_by_numero(meta_num)
            for plano_nome in plano_nome_list:
                plano_obj = get_plano_by_nome(plano_nome)
                try:
                    meta_obj.planos_setoriais_relacionados.add(plano_obj)
                    self.stdout.write(self.style.SUCCESS(f'Vinculado Plano Setorial {plano_obj.nome} à Meta {meta_obj.numero}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Erro ao vincular Plano Setorial {plano_obj.nome} à Meta {meta_obj.numero}: {e}'))