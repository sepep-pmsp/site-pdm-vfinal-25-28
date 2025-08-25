from secoes_pagina_inicial.models import SecaoRegionalizacao

def get_secao_regionalizacao() -> SecaoRegionalizacao | None:
    try:
        secao = SecaoRegionalizacao.objects.get(published=True)
        return secao
    except SecaoRegionalizacao.DoesNotExist:
        return None