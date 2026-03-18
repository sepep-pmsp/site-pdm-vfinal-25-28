from ninja import Router
from ninja.errors import HttpError


from estrutura_pdm.queries.eixos import total_metas_eixo, get_eixos
from estrutura_pdm.queries.conheca_metas import get_conheca_metas

from pdm_api.schemas.visao_geral import (
    DadosOrcamentoGeralSchema, 
    OrcamentoEixoSchema,
    ConhecaMetasSchema,
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

@router.get("/conheca_metas", response= ConhecaMetasSchema, tags=["Visão Geral"])
def conheca_metas(request)-> ConhecaMetasSchema:
    '''
    Retorna as informações gerais que serão mostrados na aba Conheça Metas.
    '''
    conheca_metas=get_conheca_metas()

    if conheca_metas is None:
        parsed_conheca_metas = {
        'nome' : None,
        'publicado' : None,
        'recursos_empenhados' : None,
        'metas_atingidas' : None,
        'metas_mais_50' : None,
        'metas_andamento_atingida' : None,
        'execucao_total' : None,
    }
        
    else:
        parsed_conheca_metas = {
            'nome' : conheca_metas.nome,
            'publicado' : conheca_metas.publicado,
            'recursos_empenhados' : conheca_metas.recursos_empenhados,
            'metas_atingidas' : conheca_metas.metas_atingidas,
            'metas_mais_50' : conheca_metas.metas_mais_50,
            'metas_andamento_atingida' : conheca_metas.metas_andamento_atingida,
            'execucao_total' : conheca_metas.execucao_total,
        }

    return ConhecaMetasSchema(**parsed_conheca_metas)

