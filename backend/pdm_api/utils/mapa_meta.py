from pdm_api.schemas.filtro_metas.search_response import MetaMapSchema
from estrutura_pdm.models.metas import Meta
from estrutura_pdm.models.metas.mapa import MapaMeta
from pdm_api.utils.static_files.images import get_abs_link
from estrutura_pdm.queries.metas import get_mapa


def solve_mapa_meta(request, meta:Meta)->MetaMapSchema:
    try:
        if meta.status_regionalizacao=="não regionalizável":
            return MetaMapSchema(
                status_regionalizacao=meta.status_regionalizacao
            )
        
        elif meta.status_regionalizacao=="regionalizável":
            mapa = get_mapa(meta, raise_error=False)
            if mapa and mapa.frase_regionalizacao:
                return MetaMapSchema(
                    status_regionalizacao=meta.status_regionalizacao,
                    nota_regionalizacao=mapa.frase_regionalizacao
                )
            else:
                raise ValueError("Meta marcada como 'regionalizável' mas não possui nota sobre regionalização associada.")
            
        elif meta.status_regionalizacao=="regionalizada":
            mapa = get_mapa(meta, raise_error=False)
            if mapa and mapa.map_image is not None:
                return MetaMapSchema(
                    status_regionalizacao=meta.status_regionalizacao,
                    map_image=get_abs_link(request, mapa.map_image),
                    map_legenda=mapa.indicador_legenda,
                    map_rodape=mapa.nota_rodape
                )
            else:
                raise ValueError("Meta marcada como 'regionalizada' mas não possui mapa associado.")
        else:
            raise ValueError(f"Status de regionalização inválido: {meta.status_regionalizacao}")
    except Exception as e:
        raise ValueError(f"Erro ao resolver mapa de meta: {type(e).__name__} {str(e)}")