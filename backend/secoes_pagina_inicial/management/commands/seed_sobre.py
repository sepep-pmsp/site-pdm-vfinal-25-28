from django.core.management.base import BaseCommand
from datetime import datetime, date
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

from secoes_pagina_inicial.models.sobre import SecaoSobre, Banner, Objetivos, ParticipacaoSocial, CardComoFeito, ComoFeito, Indicadores

class Command(BaseCommand):
    help = "Seed para Seção Sobre"
    json_file = 'sobre_pdm.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    
    def __format_date(self, date_str: str) -> date:
        return datetime.strptime(date_str, "%Y-%m-%d").date()

    def handle(self, *args, **kwargs):

        secao_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        secao_obj, created = SecaoSobre.objects.get_or_create(
            criado_por=superuser,
            criado_em=data_hoje,
            modificado_por=superuser,
            modificado_em=data_hoje,
            published=True
        )

        
        if created:
            self.stdout.write(self.style.SUCCESS(f"Seção Sobre criada com sucesso."))
        else:
            self.stdout.write(self.style.WARNING(f"Seção Sobre já existe, não foi criada novamente."))


        banner_data = secao_data['banner']

        banner_obj, created = Banner.objects.get_or_create(
            supertitulo=banner_data['supertitulo'],
            titulo=banner_data['titulo'],
            subtitulo=banner_data['subtitulo'],
            link_pdf=banner_data['link_pdf'],
            what=banner_data['what'],
            why=banner_data['why'],
            whom=banner_data['whom'],
            secao_sobre=secao_obj
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"Banner criado com sucesso."))


        objetivos_data = secao_data['objetivos']

        objetivos_obj, created = Objetivos.objects.get_or_create(
            transparencia = objetivos_data['transparencia'],
            visao_sistemica = objetivos_data['visao_sistemica'],
            otimizacao = objetivos_data['otimizacao'],
            execucao = objetivos_data['execucao'],
            secao_sobre=secao_obj
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"Objetivos - Sobre PDM criados com sucesso."))

        como_feito_data = secao_data['como_feito']

        como_feito_obj, created = ComoFeito.objects.get_or_create(
            texto=como_feito_data['texto'],
            secao_sobre=secao_obj
        )

        for card in como_feito_data['cards']:
            CardComoFeito.objects.get_or_create(
                numero=card['numero'],
                titulo=card['titulo'],
                conteudo=card['conteudo'],
                detalhe=card['detalhe'] ,
                secao = como_feito_obj
            )
        if created:
            self.stdout.write(self.style.SUCCESS(f"Seção Como é Feito - Sobre PDM criada com sucesso."))


        indicadores_data = secao_data['indicadores']

        indicadores_obj, created = Indicadores.objects.get_or_create(
            texto=indicadores_data['texto'],
            subtitulo=indicadores_data['subtitulo'],
            chamada_subsecao=indicadores_data['chamada_subsecao'],
            conteudo_subsecao=indicadores_data['conteudo_subsecao'],
            secao_sobre=secao_obj
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"Indicadores - Sobre PDM criados com sucesso."))


        participacao_data = secao_data['participacao']

        participacao_obj, created = ParticipacaoSocial.objects.get_or_create(
            texto=participacao_data['texto'],
            conteudo_audiencias=participacao_data['conteudo_audiencias'],
            link_video_audiencias=participacao_data['link_video_audiencias'],
            conteudo_devolutivas=participacao_data['conteudo_devolutivas'],
            secao_sobre=secao_obj
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"Participação Social - Sobre PDM criados com sucesso."))



        self.stdout.write(self.style.SUCCESS("Seed de Seção Sobre concluído com sucesso."))