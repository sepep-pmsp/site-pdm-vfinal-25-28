from estrutura_pdm.models.metas import (
    Meta,
    MapaMeta,
    MapaExecutado,
    MapaPlanejado,
    MapaMetaAbstract
)

def get_meta_by_numero(numero:int, raise_error:bool=True)->Meta|None:

    if not isinstance(numero, int):
        raise ValueError("O número deve ser um inteiro.")
    
    if raise_error:
        return Meta.objects.get(numero=numero)
    else:
        try:
            return Meta.objects.get(numero=numero)
        except Meta.DoesNotExist:
            return None
        
#Mapa Planejado
def get_mapa_planejado(meta:Meta, raise_error:bool=True)->MapaPlanejado|None:

    if raise_error:
        return meta.mapa_planejado
    else:
        try:
            return meta.mapa_planejado
        except MapaPlanejado.DoesNotExist:
            return None
#Mapa Executado
def get_mapa_executado(meta:Meta, raise_error:bool=True)->MapaExecutado|None:

    if raise_error:
        return meta.mapa_executado
    else:
        try:
            return meta.mapa_executado
        except MapaExecutado.DoesNotExist:
            return None
#Mapa Meta
def get_mapa_meta(meta:Meta, raise_error:bool=True)->MapaMeta|None:

    if raise_error:
        return meta.mapa
    else:
        try:
            return meta.mapa
        except MapaMeta.DoesNotExist:
            return None


#MapaMeta + Mapa Planejando (antigo MapaMeta) -> não vou alterar nomes e afins, pq deu um trabalho do cão na última vez
def get_mapa(meta:Meta, raise_error:bool=True)->MapaMetaAbstract|None:

    mapa_meta = get_mapa_meta(meta=meta, raise_error=raise_error)
    mapa_planejado = get_mapa_planejado(meta=meta, raise_error=raise_error)
    # if raise_error e error, esses dois já vão ter dado errado
    #PORTANTO, AS POSSIBILIDADES SÃO:
    #   raise_error E tem tudo = deu certo
    #   not raise error e não tem 1 ou mais = None
    #   not riase_error e tem tudo =deu certo

    if not all([mapa_meta, mapa_planejado]):
        if not raise_error:
            return None
        
    return MapaMetaAbstract(
        meta=meta,
        map_image = mapa_planejado.map_image,
        indicador_legenda = mapa_planejado.indicador_legenda,
        nota_rodape=mapa_planejado.nota_rodape,
        frase_regionalizacao = mapa_meta.frase_regionalizacao,
    )