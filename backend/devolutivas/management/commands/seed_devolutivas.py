from django.core.management.base import BaseCommand

from devolutivas.models.contribuicao import Contribuicao, ContribuicaoSubPrefeitura
from devolutivas.models.canal import Canal
from devolutivas.models.temas import Tema
from devolutivas.models.devolutiva import Devolutiva
from cadastros_basicos.queries.regionalizacao import get_subprefeitura_by_name
from cadastros_basicos.queries.orgaos import get_orgao_by_sigla


import json
import os

class Command(BaseCommand):
    help = "Seed para devolutivas"
    json_file = 'devolutivas.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("devolutivas/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def handle(self, *args, **kwargs):

        contrib_data = self.__load_json()

        for contrib in contrib_data:

            if Contribuicao.objects.filter(conteudo=contrib['id_contribuicao']).exists():
                self.stdout.write(self.style.WARNING(f"Contribuição '{contrib['id_contribuicao']}' já existe, não foi criada novamente."))
                continue

            canal, created = Canal.objects.get_or_create(nome=contrib['canal'])

            if created:
                self.stdout.write(self.style.SUCCESS(f"Canal '{canal.nome}' criado com sucesso."))

            #converter para None
            converter = ['titulo', 'resumo']
            for atributo in converter:
                if contrib[atributo]=='None' or contrib[atributo]=='':
                    contrib[atributo]=None
            
            #converter para None ints
            converter_ints=['qtd_apoios', 'qtd_comentarios']
            for atributo in converter_ints:
                if contrib[atributo]==0:
                    contrib[atributo]=None

            contrib_obj, created = Contribuicao.objects.get_or_create(
                id_contribuicao=contrib['id_contribuicao'],
                id_participe_mais=contrib['id_participe_mais'],
                canal=canal,
                origem=contrib['tipo_origem'],
                titulo=contrib['titulo'],
                conteudo=contrib['conteudo'],
                resumo=contrib['resumo'],
                qtd_apoios=contrib['qtd_apoios'],
                qtd_comentarios=contrib['qtd_comentarios'],
                municipe = contrib['municipe']
            )

            if created:

                subs_contrib = contrib['subprefeitura']

                for sub in subs_contrib:
                    if sub is not None:
                        sub_obj = get_subprefeitura_by_name(sub, raise_error=False)
                        if sub_obj is None:
                            self.stdout.write(self.style.ERROR(f"Subprefeitura '{sub}' não encontrada."))
                            raise RuntimeError(f"Subprefeitura '{sub}' não encontrada.")
                        contrib_obj.subprefeituras.add(sub_obj)

                self.stdout.write(self.style.SUCCESS(f"Contribuição '{contrib_obj.id_contribuicao}' criada com sucesso."))
            else:
                self.stdout.write(self.style.WARNING(f"Contribuição '{contrib_obj.id_contribuicao}' já existe, não foi criada novamente."))

            for devolutiva in contrib['devolutivas']:
                tema, created = Tema.objects.get_or_create(nome=devolutiva['tema'])
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Tema '{tema.nome}' criado com sucesso."))

                orgao = get_orgao_by_sigla(devolutiva['orgao'], raise_error=False)
                if orgao is None:
                    self.stdout.write(self.style.ERROR(f"Órgão '{devolutiva['orgao']}' não encontrado."))
                    raise RuntimeError(f"Órgão '{devolutiva['orgao']}' não encontrado.")
                
                devolutiva_obj, created = Devolutiva.objects.get_or_create(
                    contribuicao=contrib_obj,
                    tema=tema,
                    orgao=orgao,
                    resposta=devolutiva['devolutiva']
                )

                if created:
                        self.stdout.write(self.style.SUCCESS(f"Devolutiva {devolutiva_obj.id} para contribuição '{contrib_obj.id_contribuicao}' criada com sucesso."))
                else:
                    self.stdout.write(self.style.WARNING(f"Devolutiva {devolutiva_obj.id} para contribuição '{contrib_obj.id_contribuicao}' já existe, não foi criada novamente."))


        self.stdout.write(self.style.SUCCESS("Seed de contribuições concluído com sucesso."))