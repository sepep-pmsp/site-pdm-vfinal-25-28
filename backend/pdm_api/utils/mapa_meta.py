from pdm_api.schemas.filtro_metas.search_response import (
    MapaSchema,
    MetaMapSchema,
)
from estrutura_pdm.models.metas import Meta
from estrutura_pdm.models.metas.mapa import MapaMeta
from pdm_api.utils.static_files.images import get_abs_link
from estrutura_pdm.queries.metas import (
    get_mapa,
    get_mapa_executado,
    get_mapa_planejado,
    get_mapa_meta,
)

def solve_mapa_meta(request, meta:Meta)->MetaMapSchema:
    '''
    De MapaMeta, retorna apenas status_regionalizacao caso NÃO REGIONALIZAVEL ou REGIONALIZADA;
    Levanta um erro caso um caso REGIONALIZÁVEL não tenha frase_regionalizacao.
    '''
    try:

        # NÃO REGIONALIZÁVEL e REGIONALIZADA
        if (
            meta.status_regionalizacao=="não regionalizável"
            or meta.status_regionalizacao=="regionalizada"
        ):
            return MetaMapSchema(
                status_regionalizacao=meta.status_regionalizacao
            )
        
        # REGIONALIZAVEL
        elif meta.status_regionalizacao=="regionalizável":
            mapa = get_mapa_meta(meta, raise_error=False)
            if mapa and mapa.frase_regionalizacao:
                return MetaMapSchema(
                    status_regionalizacao=meta.status_regionalizacao,
                    nota_regionalizacao=mapa.frase_regionalizacao
                )
            else:
                raise ValueError("Meta marcada como 'regionalizável' mas não possui nota sobre regionalização associada.")
            
        
        #OUTROS CASOS
        else:
            raise ValueError(f"Status de regionalização inválido: {meta.status_regionalizacao}")
    except Exception as e:
        raise ValueError(f"Erro ao resolver mapa de meta: {type(e).__name__} {str(e)}")
    

def solve_mapa_planejado(request, meta:Meta)-> MapaSchema :
    '''
    De MapaPlanejado, retorna as informações apenas para casos REGIONALIZADOS;
    Levanta um erro quando um caso REGIONALIZADO não tem MapaPlanejado.
    '''
    try:
        #NÃO REGIONALIZAVEL E REGIONALIZAVEL
        if (
            meta.status_regionalizacao== 'não regionalizável'
            or meta.status_regionalizacao=='regionalizável'
        ):
            return MapaSchema(
                status_regionalizacao=meta.status_regionalizacao
            )
                
        # REGIONALIZADA
        elif meta.status_regionalizacao=="regionalizada":
            mapa = get_mapa_planejado(meta, raise_error=False)

            if mapa and mapa.map_image is not None:
                return MapaSchema(
                    status_regionalizacao=meta.status_regionalizacao,
                    map_image=get_abs_link(request, mapa.map_image),
                    map_legenda=mapa.indicador_legenda,
                    map_rodape=mapa.nota_rodape
                )
            else:
                raise ValueError("Meta marcada como 'regionalizada', mas não possui mapa planejado associado.")
            
        #OUTROS CASOS
        else:
            raise ValueError(f"Status de regionalização inválido: {meta.status_regionalizacao}")
    except Exception as e:
        raise ValueError(f"Erro ao resolver mapa planejado de meta: {type(e).__name__} {str(e)}")




def solve_mapa_executado(request, meta:Meta)-> MapaSchema :
    '''
    De MapaExecutado, retorna as informações apenas para casos REGIONALIZADOS;
    '''
    try:
        #NÃO REGIONALIZAVEL E REGIONALIZAVEL
        if (
            meta.status_regionalizacao== 'não regionalizável'
            or meta.status_regionalizacao=='regionalizável'
        ):
            return MapaSchema(
                status_regionalizacao=meta.status_regionalizacao
            )
                
        # REGIONALIZADA
        elif meta.status_regionalizacao=="regionalizada":
            mapa = get_mapa_executado(meta, raise_error=False)

            if mapa and mapa.map_image is not None:
                return MapaSchema(
                    status_regionalizacao=meta.status_regionalizacao,
                    map_image=get_abs_link(request, mapa.map_image),
                    map_legenda=mapa.indicador_legenda,
                    map_rodape=mapa.nota_rodape
                )
            else:
                return MapaSchema(
                    status_regionalizacao=meta.status_regionalizacao,
                )
        #OUTROS CASOS
        else:
            raise ValueError(f"Status de regionalização inválido: {meta.status_regionalizacao}")
    except Exception as e:
        raise ValueError(f"Erro ao resolver mapa executado de meta: {type(e).__name__} {str(e)}")


