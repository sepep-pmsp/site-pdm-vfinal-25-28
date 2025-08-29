from ninja import Router
from ninja.errors import HttpError

from devolutivas.queries.objs_filtro import get_all_canais, get_all_temas
from cadastros_basicos.queries.regionalizacao import get_nomes_subprefeituras
from cadastros_basicos.queries.orgaos import get_all_nomes_orgaos

from pdm_api.schemas.devolutivas.filtro import FiltroDevolutivaSchema

from typing import List

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
        orgaos = get_all_nomes_orgaos()

        return FiltroDevolutivaSchema(
            canais=canais,
            orgaos=orgaos,
            subprefeituras=subprefeituras,
            tema=temas
        )
    except Exception as e:
        raise HttpError(500, f"Erro ao buscar os dados para os filtros: {str(e)}")


