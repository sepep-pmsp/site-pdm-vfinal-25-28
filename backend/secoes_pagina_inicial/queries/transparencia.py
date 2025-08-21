from secoes_pagina_inicial.models.transparencia import SecaoTransparencia, CardTransparencia


def get_published_transparencia(raise_error=True) -> SecaoTransparencia | None:

    transparencia = SecaoTransparencia.objects.filter(published=True).first()
    if not transparencia and raise_error:
        raise ValueError("Nenhuma seção de transparência publicada encontrada.")
    return transparencia

def get_published_cards_transparencia(transparencia_section_id:int, raise_error=True)->list[CardTransparencia]|None:
    
    cards = CardTransparencia.objects.filter(secao_transparencia_id=transparencia_section_id, published=True)
    if not cards and raise_error:
        raise ValueError("Nenhum card de transparência publicado encontrado.")
    return list(cards) if cards else None

