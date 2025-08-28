from pydantic import BaseModel

class MetaResponseSchema(BaseModel):

    numero: int
    destaque: str
    descricao: str
    indicador: str
    projecao: str
    eixo: str
    tema: str
    orgaos_responsaveis: list[str]=[]
    ods_relacionados: list[str]=[]
    planos_setoriais_relacionados: list[str]=[]
    subprefeituras_entregas: list[str]=[]
    zonas_entregas: list[str]=[]


class SearchResponseSchema(BaseModel):

    total: int
    metas: list[MetaResponseSchema] = []

