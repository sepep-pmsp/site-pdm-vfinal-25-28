from ninja import Router
from ninja.errors import HttpError

from cadastros_basicos.queries.regionalizacao import get_all_zonas
from cadastros_basicos.queries.orgaos import get_all_orgaos
from estrutura_pdm.queries.eixos import get_eixos
from cadastros_basicos.queries.ods import get_all_ods
from cadastros_basicos.queries.planos_setoriais import get_all_planos_setoriais
from pdm_api.queries.filter_metas import SearchMeta

from pdm_api.schemas.filtro_metas.regionalizacao import ParametroZonaSchema, ParametroSubprefeituraSchema
from pdm_api.schemas.filtro_metas.orgaos import ParametroOrgaosSchema
from pdm_api.schemas.filtro_metas.eixos import ParametrosEixosSchema, ParametrosTemasSchema
from pdm_api.schemas.filtro_metas.ods import ParametroODSSchema
from pdm_api.schemas.filtro_metas.planos_setoriais import ParametroPlanoSetorialSchema
from pdm_api.schemas.filtro_metas.geral import ParametrosGeral
from pdm_api.schemas.filtro_metas.search_param import SearchParamSchema
from pdm_api.schemas.filtro_metas.search_response import SearchResponseSchema, MetaResponseSchema

from pdm_api.utils.static_files.images import get_abs_link


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
    
@router.get("/parametros_eixos", response=list[ParametrosEixosSchema])
def get_parametros_eixos(request):
    """
    Retorna os eixos e temas disponíveis para filtragem de metas.
    """
    try:
        eixos_objs = get_eixos()
        eixos_list = []

        for eixo_obj in eixos_objs:
            eixo_data = {
                "id": eixo_obj.id,
                "nome": eixo_obj.nome_titlecase,
                "cor" : eixo_obj.cor_principal
            }

            temas = [
                {
                    "id": tema.id,
                    "nome": tema.nome
                }
                for tema in eixo_obj.temas.all()
            ]

            eixo_data["temas"] = [ParametrosTemasSchema(**tema) for tema in temas]
            eixos_list.append(ParametrosEixosSchema(**eixo_data))

        return eixos_list
    except Exception as e:
        raise HttpError(500, f"Erro ao obter parâmetros de eixos: {str(e)}")

@router.get("/parametros_ods", response=list[ParametroODSSchema])
def get_parametros_ods(request):
    """
    Retorna os ODS disponíveis para filtragem de metas.
    """
    try:
        ods = get_all_ods()
        ods_list = []

        for ods in ods:
            ods_data = {
                "id": ods.id,
                "numero": ods.numero,
                "nome": ods.nome_titlecase,
                "cor": ods.cor_principal,
                "icone": get_abs_link(request, ods.logo_colorido)
            }
            ods_list.append(ParametroODSSchema(**ods_data))

        return ods_list
    except Exception as e:
        raise HttpError(500, f"Erro ao obter parâmetros de ODS: {str(e)}")
    
@router.get('/parametros_planos_setoriais', response=list[ParametroPlanoSetorialSchema])
def get_parametros_planos_setoriais(request):
    """
    Retorna os Planos Setoriais disponíveis para filtragem de metas.
    """

    try:
        planos_obj = get_all_planos_setoriais()
        planos_list = []
        for plano in planos_obj:
            plano_data = {
                "id" : plano.id,
                "nome" : plano.nome
            }
            planos_list.append(ParametroPlanoSetorialSchema(**plano_data))
        return planos_list
    except Exception as e:
        raise HttpError(500, f"Erro ao obter os parâmetros de Planos Setoriais: {str(e)}")

@router.get("/parametros_geral", response=ParametrosGeral)
def get_todos_parametros(request) -> ParametrosGeral:
    """
    Retorna todos os parâmetros disponíveis para filtragem de metas.
    """
    try:
        zonas = get_parametros_regionalizacao(request)
        orgaos = get_parametros_orgaos(request)
        eixos = get_parametros_eixos(request)
        ods = get_parametros_ods(request)
        planos_setoriais = get_parametros_planos_setoriais(request)
        geral = ParametrosGeral(
                regionalizacao=zonas, 
                orgaos=orgaos,
                eixos=eixos,
                ods=ods,
                planos_setoriais=planos_setoriais
                )

        return geral
    except Exception as e:
        raise HttpError(500, f"Erro ao obter parâmetros gerais: {str(e)}")
    

@router.post("/search", response=SearchResponseSchema)
def search_metas(request, params: SearchParamSchema):
    """
    Realiza a busca de metas com base nos parâmetros fornecidos.
    """
    try:
        search_meta = SearchMeta(params)
        resultados = search_meta()
        metas = [MetaResponseSchema(
            id = meta.id_eixo,
            numero=meta.numero,
            titulo=meta.titulo,
            indicador=meta.indicador,
            projecao=meta.projecao,
            eixo=meta.eixo.nome,
            cor_principal_eixo=meta.cor_principal_eixo,
            cor_secundaria_eixo=meta.cor_secundaria_eixo,
            tema=meta.tema.nome,
            orgaos_responsaveis=meta.orgaos_responsaveis_list,
            ods_relacionados=meta.ods_relacionados_list,
            planos_setoriais_relacionados=meta.planos_setoriais_relacionados_list,
            subprefeituras_entregas=meta.subprefeituras_entregas_list,
            zonas_entregas=meta.zonas_entregas_list
        ) for meta in resultados]
        return SearchResponseSchema(total=resultados.count(), metas=metas)
    except Exception as e:
        raise(e)
        raise HttpError(500, f"Erro ao buscar metas: {str(e)}")