from ninja import Router
from ninja.errors import HttpError

from cadastros_basicos.queries.regionalizacao import get_all_zonas
from cadastros_basicos.queries.orgaos import get_all_orgaos

from pdm_api.schemas.filtro_metas.regionalizacao import ParametroZonaSchema, ParametroSubprefeituraSchema
from pdm_api.schemas.filtro_metas.orgaos import ParametroOrgaosSchema
from pdm_api.schemas.filtro_metas.geral import ParametrosGeral

router = Router(tags=["Filtro de Metas"])


@router.get("/parametros_regionalizacao", response=list[ParametroZonaSchema])
def get_parametros_regionalizacao(request)->list[ParametroZonaSchema]:
    """
    Retorna os parâmetros de regionalização disponíveis para filtragem de metas.
    """
    try:
        zonas_objs = get_all_zonas()
        zonas_list = []

        for zona_obj in zonas_objs:

            zona_data = {
                "id" : zona_obj.id,
                "sigla" : zona_obj.sigla,
                "nome" : zona_obj.nome,
            }

            subprefeituras = [
                {
                    "id" : subs.id,
                    "sigla" : subs.sigla,
                    "nome" : subs.nome
                 }

                 for subs in zona_obj.subprefeituras.all().order_by("sigla")
            ]

            zona_data["subprefeituras"] = [ParametroSubprefeituraSchema(**sub) for sub in subprefeituras]
            zonas_list.append(ParametroZonaSchema(**zona_data))

        return zonas_list
    except Exception as e:
        raise HttpError(500, f"Erro ao obter parâmetros de regionalização: {str(e)}")

@router.get("/parametros_orgaos", response=list[ParametroOrgaosSchema])
def get_parametros_orgaos(request):
    """
    Retorna os órgãos disponíveis para filtragem de metas.
    """
    try:
        orgaos = get_all_orgaos()
        orgaos_list = [{"id": orgao.id, "sigla": orgao.sigla, "nome": orgao.nome} for orgao in orgaos]
        return [ParametroOrgaosSchema(**orgao_data) for orgao_data in orgaos_list]
    except Exception as e:
        raise HttpError(500, f"Erro ao obter parâmetros de órgãos: {str(e)}")

@router.get("/parametros_geral", response=ParametrosGeral)
def get_todos_parametros(request) -> ParametrosGeral:
    """
    Retorna todos os parâmetros disponíveis para filtragem de metas.
    """
    try:
        zonas = get_parametros_regionalizacao(request)
        orgaos = get_parametros_orgaos(request)
        geral = ParametrosGeral(
                regionalizacao=zonas, 
                orgaos=orgaos
                )

        return geral
    except Exception as e:
        raise HttpError(500, f"Erro ao obter parâmetros gerais: {str(e)}")