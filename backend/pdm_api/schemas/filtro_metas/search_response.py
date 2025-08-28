from pydantic import BaseModel

class MetaResponseSchema(BaseModel):

    id: str
    numero: int
    titulo: str
    indicador: str
    projecao: str
    eixo: str
    cor_principal_eixo: str
    cor_secundaria_eixo: str
    tema: str
    orgaos_responsaveis: list[str]=[]
    ods_relacionados: list[str]=[]
    planos_setoriais_relacionados: list[str]=[]
    subprefeituras_entregas: list[str]=[]
    zonas_entregas: list[str]=[]
    acoes_estrategicas: list[str]=[]


class SearchResponseSchema(BaseModel):

    total: int
    metas: list[MetaResponseSchema] = []

