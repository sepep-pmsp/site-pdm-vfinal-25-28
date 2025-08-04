from static_files.models import Imagem


def get_content_type(img:Imagem)->str:

    return f'image/{img.formato}'

def get_rel_link(img:Imagem) -> str:
    """
    Retorna o caminho relativo da imagem.
    """
    return f'images/{img.id}' if img else ''

def get_abs_link(request, img:Imagem) -> str:
    """
    Retorna o caminho absoluto da imagem.
    """
    return request.build_absolute_uri(get_rel_link(img)) if img else ''