from ninja import NinjaAPI
from ninja.errors import HttpError
from django.http import FileResponse
from typing import List

from .queries.static_files import get_image_by_id
from .queries.secoes_pagina_inicial import get_about_pdm, get_noticias, get_eixos

from .schemas.secoes_pagina_inicial import AboutPDMSchema, NoticiaSchema
from .schemas.secoes_pagina_inicial import EixoSchema as EixoPaginaInicialSchema

from .utils.static_files.images import get_rel_link, get_abs_link, get_content_type

api = NinjaAPI()

@api.get("/images/{image_id}", tags=["Imagens"])
def image(request, image_id: int) -> FileResponse:
    """
    Retrieve an image by its ID.
    """
    image = get_image_by_id(image_id)
    if not image:
        return FileResponse(status=404)
    content_type = get_content_type(image)
    return FileResponse(image.arquivo.open('rb'), content_type=content_type)


@api.get("/about_pdm", response=AboutPDMSchema, tags=["Seções Página Inicial"])
def about_pdm(request) -> AboutPDMSchema:
    """
    Retrieve the 'About PDM' section.
    """
    about_pdm = get_about_pdm()

    if about_pdm is None:
        raise HttpError(404, "Sobre o PDM não encontrado")
        
    parsed = {
        'titulo' : about_pdm.titulo,
        'subtitulo' : about_pdm.subtitulo,
        'paragrafo' : about_pdm.paragrafo,
        'link_img' :  get_abs_link(request, about_pdm.banner_image) if about_pdm.banner_image else '',
    }

    return AboutPDMSchema(**parsed)

@api.get("/noticias", response=List[NoticiaSchema], tags=["Seções Página Inicial"])
def noticias(request) -> List[NoticiaSchema]:
    """
    Retrieve the news articles.
    """
    noticias = get_noticias()
    if not noticias:
        raise HttpError(404, "Notícias não encontradas")
    parsed_list = [NoticiaSchema(
        titulo=noticia.titulo,
        link=noticia.link,
        data=noticia.data_str,
        prioridade=noticia.prioridade
    ) for noticia in noticias]

    return parsed_list

@api.get("/eixos_pagina_inicial", response=List[EixoPaginaInicialSchema], tags=["Seções Página Inicial"])
def eixos_pagina_inicial(request) -> List[EixoPaginaInicialSchema]:
    """
    Retrieve the initial page axes.
    """
    eixos = get_eixos()
    if not eixos:
        raise HttpError(404, "Eixos não encontrados")
    parsed_list = [EixoPaginaInicialSchema(
        id=eixo.id,
        nome=eixo.nome,
        titulo=eixo.titulo,
        cor_principal=eixo.cor_principal,
        imagem=get_abs_link(request, eixo.logo_branco) if eixo.logo_branco else '',
        imagem_card=get_abs_link(request, eixo.logo_colorido) if eixo.logo_colorido else '',
        lista=[tema.nome for tema in eixo.temas.all()],
        texto=eixo.descricao_as_list,
    ) for eixo in eixos]

    return parsed_list