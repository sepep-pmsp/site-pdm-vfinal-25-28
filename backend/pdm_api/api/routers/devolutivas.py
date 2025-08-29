from ninja import Router
from ninja.errors import HttpError

from devolutivas.queries.objs_filtro import get_all_canais, get_all_temas
from cadastros_basicos.queries.regionalizacao import get_nomes_subprefeituras
from cadastros_basicos.queries.orgaos import get_all_nomes_sigla_orgaos

from pdm_api.schemas.devolutivas.filtro import FiltroDevolutivaSchema, FiltroDevolutivasRequestSchema
from pdm_api.schemas.devolutivas.resultados import RespostaDevolutivaSchema, DetailDevolutivaSchema, ListingDevolutivaSchema 
from pdm_api.schemas.devolutivas.secao import ModalApresentacaoSchema, BoxDevolutivaSchema, LinksAudienciasSchema, SecaoDevolutivaSchema

from pdm_api.queries.filter_devolutivas.apply_filter import search_contribs
from pdm_api.queries.filter_devolutivas.secao import get_secao

from typing import List
from pdm_api.utils.static_files.images import get_abs_link


router = Router(tags=["Devolutivas"])

@router.get('/filtro', response=FiltroDevolutivaSchema)
def get_filtro(request):
    """
    Retorna os dados para popular os filtros de busca das devolutivas.
    """
    try:
        canais = get_all_canais()
        temas = get_all_temas()
        subprefeituras = get_nomes_subprefeituras()
        orgaos = get_all_nomes_sigla_orgaos()

        return FiltroDevolutivaSchema(
            canais=canais,
            orgaos=orgaos,
            subprefeituras=subprefeituras,
            tema=temas
        )
    except Exception as e:
        raise HttpError(500, f"Erro ao buscar os dados para os filtros: {str(e)}")
    
@router.post('/search', response=List[ListingDevolutivaSchema])
def search_devolutivas(request, filtro: FiltroDevolutivasRequestSchema):

    contribs = search_contribs(filtro)

    results = []
    for contrib in contribs:

        respostas = []
        for devolutiva in contrib.devolutivas.all():
            parsed_resp = RespostaDevolutivaSchema(
                orgao = devolutiva.orgao.sigla_nome,
                texto = devolutiva.resposta
            )

            respostas.append(parsed_resp)


        if contrib.origem == 'revisao':
            resumo = f"Sugestão de Revisão/Alteração no Participe+"
        
        elif contrib.origem == 'fala':
            resumo = f"Fala realizada na {contrib.canal.nome} pelo munícipe {contrib.municipe}"
        else:
            resumo = contrib.resumo
        
        parsed_detail = DetailDevolutivaSchema(
            tipo = contrib.get_origem_display(),
            titulo = contrib.titulo,
            resumo=resumo,
            conteudo=contrib.conteudo,
            apoios=contrib.qtd_apoios,
            comentarios=contrib.qtd_comentarios,
            respostas=respostas
        )

        parsed_listing = ListingDevolutivaSchema(
            nome=contrib.municipe,
            canal=contrib.canal.nome,
            subprefeituras=[sub.sigla_nome for sub in contrib.subprefeituras.all()],
            temas=contrib.temas_list,
            detalhe=parsed_detail
        )

        results.append(parsed_listing)

    return results

@router.get('/secao_participacao', response=SecaoDevolutivaSchema)
def get_secao_participacao(request):

    secao_obj = get_secao()
    if not secao_obj:
        raise HttpError(404, "Seção de Participação não encontrada.")
    

    modal_obj = secao_obj.modal_secao
    modal_parsed = ModalApresentacaoSchema(
        imagem = get_abs_link(request, modal_obj.imagem),
        titulo = modal_obj.titulo,
        subtitulo=modal_obj.subtitulo,
        paragrafos=[paragrafo.conteudo for paragrafo in modal_obj.paragrafos.all()],
        texto = modal_obj.texto
    )

    box_parsed = BoxDevolutivaSchema(
        imagem_fundo = get_abs_link(request, secao_obj.imagem),
        subtitulo = secao_obj.subtitulo_box,
        paragrafos = secao_obj.texto_box

    )

    links_obj = secao_obj.links_youtube.all()
    links_data = {}
    for link in links_obj:
        if link.tipo_link not in links_data:
            links_data[link.tipo_link] = []
        links_data[link.tipo_link].append(link.url)

    links_parsed  = LinksAudienciasSchema(
        destaque = links_data['destaque'][0],
        lista = links_data['listing'],
        botao = links_data['botao'][0]
    )

    filtro = get_filtro(request)

    secao_parsed = SecaoDevolutivaSchema(
        titulo = secao_obj.titulo,
        subtitulo = secao_obj.subtitulo,
        apresentacao = modal_parsed,
        devolutivas = box_parsed,
        audiencia = links_parsed,
        filtro=filtro,
        results=[]
    )

    return secao_parsed

@router.post('/secao_participacao', response=SecaoDevolutivaSchema)
def get_secao_with_results(request, filtro: FiltroDevolutivasRequestSchema):

    results = search_devolutivas(request, filtro)
    secao = get_secao_participacao(request)

    secao.results = results
    return secao