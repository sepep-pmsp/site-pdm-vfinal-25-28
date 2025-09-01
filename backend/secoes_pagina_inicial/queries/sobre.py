from secoes_pagina_inicial.models.sobre import SecaoSobre


def get_published_secao_sobre(raise_error=True) -> SecaoSobre | None:

    sobre = SecaoSobre.objects.filter(published=True).first()
    if not sobre and raise_error:
        raise ValueError("Nenhuma seção Sobre publicada encontrada.")
    return sobre
