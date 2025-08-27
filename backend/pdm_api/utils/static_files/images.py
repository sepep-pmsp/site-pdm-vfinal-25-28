from static_files.models import Imagem


def get_content_type(img:Imagem)->str:

    return f'image/{img.formato}'

def get_rel_link(img:Imagem) -> str:
    """
    Retorna o caminho relativo da imagem.
    """
    return f'api/static/images/{img.id}' if img else ''

def get_abs_link(request, img: Imagem) -> str:
    if not img:
        return ""
    rel = get_rel_link(img)                       # ex: "api/static/image/1"
    abs_path = "/" + rel.lstrip("/")              # garante caminho absoluto
    return request.build_absolute_uri(abs_path)