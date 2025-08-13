import json
import os
from django.core.management.base import BaseCommand
from estrutura_pdm.models.eixos import Eixo
from estrutura_pdm.models.metas import Meta, MetaOrgao
from estrutura_pdm.queries.eixos import get_eixo_by_nome
from cadastros_basicos.queries.orgaos import get_orgao_by_sigla
from cadastros_basicos.models.estrutura_administrativa import Orgao

class Command(BaseCommand):
    json_file = "metas.json"
    help  = "Seed para metas"

    def __load_json(self) -> dict:
        file_path = os.path.join("estrutura_pdm/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data

    def handle(self, *args, **options):
        data = self.__load_json()
        for item in data:
            eixo = get_eixo_by_nome(item["eixo"])
            
            meta, created =Meta.objects.get_or_create(
                numero=item['numero'],
                destaque=item['destaque'],
                descricao=item['descricao'],
                eixo=eixo,
                tema=eixo.temas.first()
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Meta {meta.numero} criada com sucesso.'))
                orgaos_meta = []
                for orgao in item['orgao_responsavel']:
                    try:
                        orgao_obj = get_orgao_by_sigla(orgao)
                        orgaos_meta.append(orgao_obj)
                    except Orgao.DoesNotExist as e:
                        self.stdout.write(self.style.ERROR(f'Erro ao buscar órgão: {orgao} não encontrado'))
                        continue
                for orgao in orgaos_meta:
                    try:
                        MetaOrgao.objects.create(meta=meta, orgao=orgao)
                        self.stdout.write(self.style.SUCCESS(f'Órgão {orgao.sigla} associado à meta {meta.numero}.'))
                    except MetaOrgao.DoesNotExist as e:
                        self.stdout.write(self.style.ERROR(f'Erro ao associar órgão {orgao.sigla} à meta {meta.numero}: {e}'))
            else:
                self.stdout.write(self.style.WARNING(f'Meta {meta.numero} já existe.'))


            
