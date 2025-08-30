from django.db.models import QuerySet, Q

from estrutura_pdm.models.eixos import Eixo, Tema
from cadastros_basicos.models.estrutura_administrativa import Orgao
from cadastros_basicos.models.regionalizacao import SubPrefeitura, Zona
from cadastros_basicos.models.vinculos_externos import ODS, PlanoSetorial

from .validate_ids import validate_fk_ids



def filter_by_ods(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(ODS, ids)
    if not valid_ids:
        return queryset
    return queryset.filter(ods_relacionados__id__in=valid_ids)


def filter_by_planos_setoriais(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(PlanoSetorial, ids)
    if not valid_ids:
        return queryset
    return queryset.filter(planos_setoriais_relacionados__id__in=valid_ids)


def filter_by_eixos(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(Eixo, ids)
    if not valid_ids:
        return queryset
    return queryset.filter(eixo__id__in=valid_ids)

def filter_by_temas(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(Tema, ids)
    if not valid_ids:
        return queryset
    return queryset.filter(tema__id__in=valid_ids)

def filter_by_orgao_responsavel(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(Orgao, ids)
    if not valid_ids:
        return queryset
    return queryset.filter(orgaos_responsaveis__id__in=valid_ids)


def filter_by_subprefeituras_entregas(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(SubPrefeitura, ids)
    if not valid_ids:
        return queryset
    return queryset.filter(subprefeituras_entregas__id__in=valid_ids)


def filter_by_zonas_entregas(queryset: QuerySet, ids: list[int])->QuerySet:

    valid_ids = validate_fk_ids(Zona, ids)
    if not valid_ids:
        return queryset
    
    cond = (
        Q(zonas_entregas__id__in=valid_ids) |
        Q(subprefeituras_entregas__zona_id__in=valid_ids)
    )

    return queryset.filter(cond)


