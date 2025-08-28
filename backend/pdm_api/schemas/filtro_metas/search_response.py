from pydantic import BaseModel, model_validator, field_validator
from typing import Optional, Literal

class MetaListingSchema(BaseModel):

    numero: str
    titulo: str
    eixo_cor_principal: str

class AtributoStrCardSchema(BaseModel):

    titulo: str
    valor: str
    tipo: Literal['str']='str'

    @model_validator(mode='after')
    def validate_tipo(self):

        if not self.tipo== 'str':
            raise ValueError('Invalid tipo for AtributoStrCardSchema')
        return self

class AtributoListCardSchema(BaseModel):

    titulo: str
    valor: list[str]
    tipo: Literal['list']='list'

    @model_validator(mode='after')
    def validate_tipo(self):

        if not self.tipo== 'list':
            raise ValueError('Invalid tipo for AtributoListCardSchema')
        return self

class MetaCardSchema(BaseModel):

    numero: str
    projecao: AtributoStrCardSchema
    acoes_estrategicas: Optional[AtributoListCardSchema]=None
    indicador: AtributoStrCardSchema
    orgaos_responsaveis: AtributoListCardSchema
    eixo_nome: str
    eixo_cor_principal: str
    eixo_cor_secundaria: str
    eixo_frase: list[str]=[]

class MetaResponseSchema(BaseModel):

    id: str
    card: MetaCardSchema
    listing: MetaListingSchema


class SearchResponseSchema(BaseModel):

    total: int
    metas: list[MetaResponseSchema] = []

