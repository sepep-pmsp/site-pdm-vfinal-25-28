from django.core.management.base import BaseCommand
from secoes_pagina_inicial.models import SecaoTransparencia, CardTransparencia
from datetime import datetime
from cadastros_basicos.queries.superuser import get_superuser
import json
import os

class Command(BaseCommand):
    help = "Seed para a seção Transparência da Página Inicial"
    json_file = 'transparencia.json'

    
    def __load_json(self)->dict:

        file_path = os.path.join("secoes_pagina_inicial/data", self.json_file)
        with open(file_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        return data
    

    def handle(self, *args, **kwargs):

        transparencia_data = self.__load_json()
        superuser = get_superuser()
        data_hoje = datetime.now().date()

        if SecaoTransparencia.objects.filter(titulo=transparencia_data['titulo']).exists():
            self.stdout.write(self.style.WARNING(f"Seção de Transparência '{transparencia_data['titulo']}' já existe, não foi criada novamente."))
            return


        transparencia_obj, created = SecaoTransparencia.objects.get_or_create(
            titulo = transparencia_data['titulo'],
            subtitulo = transparencia_data.get('subtitulo'),
            published=True,
            criado_por=superuser,
            criado_em=data_hoje,
            modificado_por=superuser,
            modificado_em=data_hoje
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"Seção de Transparência '{transparencia_obj.titulo}' criada com sucesso."))
        else:
            self.stdout.write(self.style.WARNING(f"Seção de Transparência '{transparencia_obj.titulo}' já existe, não foi criada novamente."))
            

        for i, card in enumerate(transparencia_data['cards']):
            card_obj, created = CardTransparencia.objects.get_or_create(
                titulo=card['titulo'],
                conteudo=card['conteudo'],
                botao_txt=card['botao_txt'],
                botao_url=card['botao_url'],
                secao_transparencia=transparencia_obj,
                published=True,
                ordem=i+1
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f"Card '{card_obj.titulo}' criado com sucesso."))
            else:
                self.stdout.write(self.style.WARNING(f"Card '{card_obj.titulo}' já existe, não foi criado novamente."))

        transparencia_obj.save()


        self.stdout.write(self.style.SUCCESS("Seed da Seção Transparência concluído com sucesso."))