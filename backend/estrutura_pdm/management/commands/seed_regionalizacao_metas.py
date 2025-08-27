import json
import os
from django.core.management.base import BaseCommand
from cadastros_basicos.models.regionalizacao import SubPrefeitura
from estrutura_pdm.models.metas import Meta
from estrutura_pdm.queries.metas import get_meta_by_numero
from cadastros_basicos.queries.regionalizacao import get_subprefeitura_by_sigla


class Command(BaseCommand):
    json_file = "metas_subs.json"
    help  = "Seed para regionalização das Metas - Subprefeituras"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
     
    def get_subprefeitura(self, sigla:str)->SubPrefeitura:

        
        if sigla is None:
            self.stdout.write(self.style.ERROR('Sigla da subprefeitura não encontrada no objeto PDM.'))
            raise ValueError('Sigla da subprefeitura não encontrada no objeto PDM.')

        subprefeitura = get_subprefeitura_by_sigla(sigla, raise_error=False)
        if subprefeitura is None:
            self.stdout.write(self.style.ERROR(f'Subprefeitura {sigla} não encontrada.'))
            raise ValueError(f'Subprefeitura {sigla} não encontrada.')

        return subprefeitura

    def vincular_subprefeitura(self, meta_obj:Meta, sigla_subprefeitura:str) -> Meta:

        subprefeitura = self.get_subprefeitura(sigla_subprefeitura)

        meta_obj.subprefeituras_entregas.add(subprefeitura)

        self.stdout.write(self.style.SUCCESS(f'Subprefeitura {subprefeitura.sigla} vinculada à Meta {meta_obj.numero} com sucesso.'))
        return meta_obj


    def handle(self, *args, **options):
        json_data = self.__load_json()
        for meta, siglas_sub_list in json_data.items():

            meta_obj = get_meta_by_numero(int(meta), raise_error=False)
            if meta_obj is None:
                self.stdout.write(self.style.ERROR(f'Meta {meta} não encontrada.'))
                continue

            for sigla_sub in siglas_sub_list:
                try:
                    self.vincular_subprefeitura(meta_obj, sigla_sub)
                except ValueError as e:
                    self.stdout.write(self.style.ERROR(f'Erro ao vincular subprefeitura {sigla_sub} à Meta {meta}: {e}'))
                    continue