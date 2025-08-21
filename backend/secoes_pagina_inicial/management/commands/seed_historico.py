from django.core.management.base import BaseCommand
from secoes_pagina_inicial.models import Historico, CardHistorico 
from datetime import datetime
from estrutura_pdm.queries.pdms import get_pdm_by_id
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

class Command(BaseCommand):
    help = "Seed para seção Histórico/PDMS Anteriores da página inicial"
    json_file = 'historico.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **kwargs):

        historico_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        titulo = historico_data['titulo']
        instrucao = historico_data['instrucao']
        paragrafo = historico_data['paragrafo']

        if Historico.objects.filter(titulo=titulo).exists():
            self.stdout.write(self.style.WARNING(f"Seção Histórico/PDMS Anteriores da página inicial com o título  {titulo} já existe, não foi criada novamente."))
            return

        historico_obj, created = Historico.objects.get_or_create(
            titulo=titulo,
            instrucao=instrucao,
            paragrafo=paragrafo,
            criado_por=superuser,
            criado_em=data_hoje,
            modificado_por=superuser,
            modificado_em=data_hoje,
            published=True
        )

        
        if created:
            for i, card in enumerate(historico_data['cards']):
                id_pdm_associado=card['pdm_associado']
                pdm_associado = get_pdm_by_id(id_pdm_associado)
                CardHistorico.objects.create(
                    historico=historico_obj,
                    conteudo=card.get('conteudo'),
                    cor_principal=card['cor_principal'],
                    cor_botao=card['cor_botao'],
                    pdm = pdm_associado,
                    ordem=i + 1
                )

            self.stdout.write(self.style.SUCCESS(f"Seção Histórico/PDMS Anteriores da página inicial '{historico_obj.titulo}' criada com sucesso."))
        else:
            self.stdout.write(self.style.WARNING(f"Seção Histórico/PDMS Anteriores da página inicial '{historico_obj.titulo}' já existe, não foi criada novamente."))

        self.stdout.write(self.style.SUCCESS("Seed de seções Histórico/PDMS Anteriores concluído com sucesso."))