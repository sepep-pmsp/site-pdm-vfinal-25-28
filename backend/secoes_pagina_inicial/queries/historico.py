from secoes_pagina_inicial.models import Historico

def get_published_historico() -> Historico | None:

    historicos = Historico.objects.filter(published=True)

    historicos = list(historicos)
    if len(historicos) > 1:
        raise RuntimeError("Existe mais de um histórico publicado.")
    elif len(historicos) == 1:
        return historicos[0]
    else:
        return None
