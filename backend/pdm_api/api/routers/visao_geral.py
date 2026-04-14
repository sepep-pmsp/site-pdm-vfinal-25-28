from ninja import Router
from ninja.errors import HttpError


from estrutura_pdm.queries.eixos import total_metas_eixo, get_eixos
from estrutura_pdm.queries.conheca_metas import get_conheca_metas
from estrutura_pdm.queries.testes_debora import get_testes_debora

from pdm_api.schemas.visao_geral import (
    DadosOrcamentoGeralSchema, 
    OrcamentoEixoSchema,
    ConhecaMetasSchema,
    ConhecaMetasCardSchema,
    TestesDeboraCardSchema,
)

router = Router(tags=["Visão Geral"])



@router.get("/orcamento_geral", response=DadosOrcamentoGeralSchema, tags=["Visão Geral"])
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

@router.get("/conheca_metas", response= ConhecaMetasCardSchema, tags=["Visão Geral"])
def conheca_metas(request)-> ConhecaMetasCardSchema:
    '''
    Retorna as informações gerais que serão mostrados na aba Conheça Metas.
    '''
    conheca_metas=ConhecaMetasCardSchema(
            titulo="CONHECA METAS",
            list_conheca_metas=get_conheca_metas() or []
    )
    
    return conheca_metas

@router.get("/testes_debora", response= TestesDeboraCardSchema, tags=["Visão Geral"])
def testes_debora(request)-> TestesDeboraCardSchema:
    ''''''
    testes_debora = TestesDeboraCardSchema(
        titulo="TESTES DEBORA",
        list_testes_debora= get_testes_debora() or []
    )

    return testes_debora