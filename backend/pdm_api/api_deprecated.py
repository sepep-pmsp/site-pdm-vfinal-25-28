from ninja import NinjaAPI
from ninja.errors import HttpError
from django.http import FileResponse
from typing import List

from .queries.static_files import get_image_by_id
from .queries.secoes_pagina_inicial import get_about_pdm, get_noticias
from estrutura_pdm.queries.eixos import get_eixos, total_metas_eixo
from secoes_pagina_inicial.queries.transparencia import get_published_cards_transparencia, get_published_transparencia

from .schemas.secoes_pagina_inicial import AboutPDMSchema, NoticiaSchema
from .schemas.secoes_pagina_inicial import EixoSchema as EixoPaginaInicialSchema
from .schemas.secoes_pagina_inicial import SecaoTransparenciaSchema, CardSecaoTransparenciaSchema
from .schemas.visao_geral import DadosOrcamentoGeralSchema, OrcamentoEixoSchema

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
        
    parsed_about = {
        'titulo' : about_pdm.titulo,
        'subtitulo' : about_pdm.subtitulo,
        'paragrafo' : about_pdm.paragrafo_as_str,
        'link_img' :  get_abs_link(request, about_pdm.banner_image) if about_pdm.banner_image else '',
    }

    carta = about_pdm.carta_do_prefeito
    if carta is None:
        raise HttpError(404, "Carta do Prefeito não encontrada")
    parsed_carta  = {
        'titulo': carta.titulo,
        'nome_prefeito': carta.prefeito.nome,
        'paragrafos': carta.paragrafo_as_list
    }

    parsed_about['carta_prefeito'] = parsed_carta

    return AboutPDMSchema(**parsed_about)

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

@api.get('/transparencia_pagina_inicial', response=SecaoTransparenciaSchema, tags=["Seções Página Inicial"])
def transparencia_pagina_inicial(request) -> SecaoTransparenciaSchema:
    """
    Retrieve the transparency section for the initial page.
    """
    
    transparencia_obj = get_published_transparencia(raise_error=False)
    if not transparencia_obj:
        raise HttpError(404, "Seção de transparência não encontrada")
    
    parsed_transparencia = {
        "titulo": transparencia_obj.titulo,
        "subtitulo": transparencia_obj.subtitulo,
        'recursos' : []
    }

    cards = get_published_cards_transparencia(transparencia_obj.id, raise_error=False)
    if not cards:
        raise HttpError(404, "Cards da seção de transparência não encontrados")
    
    for card in cards:
        parsed_card = CardSecaoTransparenciaSchema(
            subtitulo=card.titulo,
            paragrafo=card.conteudo,
            ordem=card.ordem,
            nome_btn=card.botao_txt,
            link=card.botao_url
        )
        parsed_transparencia['recursos'].append(parsed_card)

    return SecaoTransparenciaSchema(**parsed_transparencia)




@api.get("/orcamento_geral", response=DadosOrcamentoGeralSchema, tags=["Visão Geral"])
def orcamento_geral(request)->DadosOrcamentoGeralSchema:
    """
    Retrieve the general budget data.
    """
    orcamento_geral = {
        "orcamento_total" : 0,
        "total_metas" : 0,
        "orcamentos_por_eixo" : []
    }
    
    eixos = get_eixos()
    if not eixos:
        raise HttpError(404, "Eixos não encontrados")

    for eixo in eixos:

        total_metas = total_metas_eixo(eixo.id)
        orcamento_eixo = eixo.orcamento

        orcamento_geral["orcamento_total"] += orcamento_eixo
        orcamento_geral["total_metas"] += total_metas

        dados_eixo = OrcamentoEixoSchema(
            nome=eixo.nome,
            cor_principal=eixo.cor_principal,
            qtd_metas=total_metas,
            orcamento=orcamento_eixo
        )

        orcamento_geral["orcamentos_por_eixo"].append(dados_eixo)
    
    return DadosOrcamentoGeralSchema(**orcamento_geral)
    
       
