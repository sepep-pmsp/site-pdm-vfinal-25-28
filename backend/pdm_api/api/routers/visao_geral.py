from ninja import Router
from ninja.errors import HttpError

from estrutura_pdm.queries.eixos import total_metas_eixo, get_eixos

from pdm_api.schemas.visao_geral import DadosOrcamentoGeralSchema, OrcamentoEixoSchema


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