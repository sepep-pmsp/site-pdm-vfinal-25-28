import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.metas import Meta, AcaoEstrategica
from estrutura_pdm.queries.metas import get_meta_by_numero
from cadastros_basicos.queries.orgaos import get_orgao_by_sigla
from cadastros_basicos.models.estrutura_administrativa import Orgao

class Command(BaseCommand):
    json_file = "acoes_estrategicas.json"
    help  = "Seed para ações estratétigicas"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data

    def handle(self, *args, **options):
        data = self.__load_json()

        for item in data:

            if AcaoEstrategica.objects.filter(numero=item['numero_acao']).exists():
                self.stdout.write(self.style.WARNING(f'Ação {item["numero_acao"]} já existe.'))
                continue

            try:
                meta = get_meta_by_numero(item["numero_meta"])
            except Meta.DoesNotExist:
                raise RuntimeError(f"Meta com número {item['numero_meta']} não encontrada.")
            try:
                orgao = get_orgao_by_sigla(item['orgao_acao'])
            except Orgao.DoesNotExist:
                raise RuntimeError(f"Órgão com sigla {item['orgao_acao']} não encontrado.")
            qtd_acoes = meta.acoes_estrategicas.count()
            posit = qtd_acoes + 1 if qtd_acoes else 1
            acao, created = AcaoEstrategica.objects.get_or_create(
                numero=item['numero_acao'],
                descricao=item['desc_acao'],
                meta=meta,
                posicao=posit,
                orgao_responsavel=orgao
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Ação {acao.numero} criada com sucesso.'))
               
            else:
                self.stdout.write(self.style.WARNING(f'Ação {acao.numero} já existe.'))


            
