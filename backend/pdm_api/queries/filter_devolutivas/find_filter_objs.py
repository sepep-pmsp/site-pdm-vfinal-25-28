from cadastros_basicos.models.estrutura_administrativa import Orgao
from cadastros_basicos.models.regionalizacao import SubPrefeitura
from devolutivas.models.canal import Canal
from devolutivas.models.temas import Tema

from pdm_api.schemas.devolutivas.filtro import FiltroDevolutivaSchema


def get_orgaos(list_siglas_nomes:list[str])->list[Orgao]:

    siglas = [sigla_nome.split('-')[0].strip() for sigla_nome in list_siglas_nomes]
    orgaos = Orgao.objects.filter(sigla__in=siglas).all()
    return list(orgaos)


def get_subprefeituras(list_nomes:list[str])->list[SubPrefeitura]:

    subprefeituras = SubPrefeitura.objects.filter(nome__in=list_nomes).all()
    return list(subprefeituras)

def get_canais(list_nomes:list[str])->list[Canal]:

    canais = Canal.objects.filter(nome__in=list_nomes).all()
    return list(canais)

def get_temas(list_nomes:list[str])->list[Tema]:

    temas = Tema.objects.filter(nome__in=list_nomes).all()
    return list(temas)


def get_filter_objs(filtro: FiltroDevolutivaSchema):

    orgaos = get_orgaos(filtro.orgaos) if filtro.orgaos else []
    subprefeituras = get_subprefeituras(filtro.subprefeituras) if filtro.subprefeituras else []
    canais = get_canais(filtro.canais) if filtro.canais else []
    temas = get_temas(filtro.temas) if filtro.temas else []

    return {
        'orgaos': orgaos,
        'subprefeituras': subprefeituras,
        'canais': canais,
        'temas': temas
    }