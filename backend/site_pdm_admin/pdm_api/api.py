from ninja import NinjaAPI
from django.http import FileResponse
from typing import List

from .queries.static_files import get_image_by_id
from .queries.secoes_pagina_inicial import get_about_pdm, get_noticias

from .schemas.secoes_pagina_inicial import AboutPDMSchema, NoticiaSchema

api = NinjaAPI()

@api.get("/images/{image_id}", tags=["Imagens"])
def image(request, image_id: int) -> FileResponse:
    """
    Retrieve an image by its ID.
    """
    image = get_image_by_id(image_id)
    if not image:
        return FileResponse(status=404)
    content_type = f'image/{image.formato}'
    return FileResponse(image.arquivo.open('rb'), content_type=content_type)


@api.get("/about_pdm", response=AboutPDMSchema, tags=["Seções Página Inicial"])
def about_pdm(request) -> AboutPDMSchema:
    """
    Retrieve the 'About PDM' section.
    """
    about_pdm = get_about_pdm()
    if not about_pdm:
        return AboutPDMSchema()
    
    parsed = {
        'titulo' : about_pdm.titulo,
        'subtitulo' : about_pdm.subtitulo,
        'paragrafo' : about_pdm.paragrafo,
        'link_img' : 'images/' + str(about_pdm.banner_image.id) if about_pdm.banner_image else None,
    }

    return AboutPDMSchema(**parsed)

@api.get("/noticias", response=List[NoticiaSchema], tags=["Seções Página Inicial"])
def noticias(request) -> List[NoticiaSchema]:
    """
    Retrieve the news articles.
    """
    noticias = get_noticias()
    return [NoticiaSchema(
        titulo=noticia.titulo,
        link=noticia.link,
        data=noticia.data_str,
        prioridade=noticia.prioridade
    ) for noticia in noticias]