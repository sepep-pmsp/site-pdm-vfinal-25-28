from ninja import Router
from ninja.errors import HttpError

from pdm_api.queries.secoes_pagina_inicial import get_about_pdm, get_noticias
from estrutura_pdm.queries.eixos import get_eixos
from secoes_pagina_inicial.queries.transparencia import get_published_cards_transparencia, get_published_transparencia
from secoes_pagina_inicial.queries.historico import get_published_historico
from pdm_api.queries.secoes_pagina_inicial import get_secao_regionalizacao

from pdm_api.schemas.secoes_pagina_inicial import AboutPDMSchema, NoticiaSchema
from pdm_api.schemas.secoes_pagina_inicial import EixoSchema as EixoPaginaInicialSchema
from pdm_api.schemas.secoes_pagina_inicial import SecaoTransparenciaSchema, CardSecaoTransparenciaSchema
from pdm_api.schemas.secoes_pagina_inicial import HistoricoSchema, CardHistoricoSchema, DocumentoHistoricoSchema
from pdm_api.schemas.secoes_pagina_inicial import SecaoRegionalizacaoSchema

from typing import List

from pdm_api.utils.static_files.images import get_abs_link


router = Router(tags=['Seções Página Inicial'])

@router.get("/about_pdm", response=AboutPDMSchema, tags=["Seções Página Inicial"])
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


@router.get("/noticias", response=List[NoticiaSchema], tags=["Seções Página Inicial"])
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

@router.get("/eixos", response=List[EixoPaginaInicialSchema], tags=["Seções Página Inicial"])
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


@router.get('/transparencia', response=SecaoTransparenciaSchema, tags=["Seções Página Inicial"])
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

@router.get('/historico', response=HistoricoSchema, tags=['Seções Página Inicial'])
def historico_pagina_inicial(request)->HistoricoSchema:
    """
    Retrieves the previous Programa de Metas files and historical information for the initial page.
    """

    historico_obj = get_published_historico()
    if not historico_obj:
        raise HttpError(404, "Histórico não encontrado")
    
    cards = []

    for card_obj in historico_obj.cards.all():
        card_data = {
            'id' : card_obj.id_str,
            'imagem' : get_abs_link(request, card_obj.imagem),
            'cor_principal' : card_obj.cor_principal,
            'cor_botao' : card_obj.cor_botao,
            'documentos' : []
        }
        for doc in card_obj.documentos:
            doc_data ={
                'tipo' : doc.tipo.nome,
                'nome' : doc.nome,
                'url' : doc.url
            }

            parsed_doc = DocumentoHistoricoSchema(**doc_data)
            card_data['documentos'].append(parsed_doc)

        parsed_card = CardHistoricoSchema(**card_data)
        cards.append(parsed_card)

    parsed_historico = {
        'titulo' : historico_obj.titulo,
        'instrucao' : historico_obj.instrucao,
        'paragrafo' : historico_obj.paragrafo,
        'cards' : cards
    }

    return HistoricoSchema(**parsed_historico)

@router.get("/regionalizacao", response=SecaoRegionalizacaoSchema, tags=["Seções Página Inicial"])
def regionalizacao_pagina_inicial(request) -> SecaoRegionalizacaoSchema:
    """
    Retrieve the regionalization section for the initial page.
    """
    regionalizacao_obj = get_secao_regionalizacao()
    if not regionalizacao_obj:
        raise HttpError(404, "Seção de regionalização não encontrada")

    regionalizacao_data = {
        "titulo": regionalizacao_obj.titulo,
        "subtitulo": regionalizacao_obj.subtitulo,
        "instrucao" : regionalizacao_obj.instrucao,
        "paragrafo": regionalizacao_obj.paragrafo_as_str,
        "link_arquivo": regionalizacao_obj.link_arquivo,
        "link_dashboard": regionalizacao_obj.link_dashboard
    }

    return SecaoRegionalizacaoSchema(**regionalizacao_data)

