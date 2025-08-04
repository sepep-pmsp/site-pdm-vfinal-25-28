from secoes_pagina_inicial.models.news import Noticia
from typing import List

def get_noticias() -> List[Noticia]:
    return Noticia.objects.filter(published=True).order_by("-prioridade", "-data").all()