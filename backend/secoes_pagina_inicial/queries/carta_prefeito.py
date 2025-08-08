from secoes_pagina_inicial.models import CartaPrefeito

def get_carta_prefeito_by_titulo_and_name(titulo: str, nome: str, raise_error:bool=True) -> CartaPrefeito:

    if raise_error:
        return CartaPrefeito.objects.get(titulo=titulo, prefeito__nome=nome)
    else:
        try:
            return CartaPrefeito.objects.get(titulo=titulo)
        except CartaPrefeito.DoesNotExist:
            return None
