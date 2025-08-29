from pdm_api.schemas.devolutivas.filtro import FiltroDevolutivaSchema

from devolutivas.models.contribuicao import Contribuicao

from .find_filter_objs import get_filter_objs


def search_contribs(filtro: FiltroDevolutivaSchema):

    filter_objs = get_filter_objs(filtro)

    qs = Contribuicao.objects.prefetch_related('devolutivas', 'subprefeituras', 'canal')
    if filter_objs['orgaos']:
        qs = qs.filter(devolutivas__orgao__in=filter_objs['orgaos'])

    if filter_objs['subprefeituras']:
        qs = qs.filter(subprefeituras__in=filter_objs['subprefeituras'])

    if filter_objs['canais']:
        qs = qs.filter(canal__in=filter_objs['canais'])

    if filter_objs['temas']:
        qs = qs.filter(devolutivas__tema__in=filter_objs['temas'])
    qs = qs.distinct().order_by('id_contribuicao')

    return list(qs.all())
