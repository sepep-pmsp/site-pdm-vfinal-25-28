from pydantic import BaseModel, model_validator, field_validator
from typing import Optional, Literal
from estrutura_pdm.models.metas.status_monitoramento import StatusMonitoramento

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
    
class AcaoEstrategicaSchema(BaseModel):
    numero: str
    descricao: str
    concluida: bool


class AtributoListObjCardSchema(BaseModel):

    titulo: str
    valor: list[AcaoEstrategicaSchema]
    tipo: Literal['list'] = 'list'

    @model_validator(mode='after')
    def validate_tipo(self):
        if self.tipo != 'list':
            raise ValueError('Invalid tipo for AtributoListObjCardSchema')
        return self
    
class MetaMapSchema(BaseModel):

    status_regionalizacao: Literal["não regionalizável", "regionalizável", "regionalizada"]
    nota_regionalizacao: Optional[str]=None
    map_image: Optional[str]=None
    map_legenda: Optional[str]=None
    map_rodape: Optional[str]=None


class MetaCardSchema(BaseModel):

    numero: str
    projecao: AtributoStrCardSchema
    acoes_estrategicas: Optional[AtributoListObjCardSchema]=None
    indicador: AtributoStrCardSchema
    orgaos_responsaveis: AtributoListCardSchema
    eixo_nome: str
    eixo_cor_principal: str
    eixo_cor_secundaria: str
    eixo_frase: list[str]=[]
    monitoramento: StatusMonitoramento
    regionalizacao: MetaMapSchema

    

class MetaResponseSchema(BaseModel):

    id: str
    card: MetaCardSchema
    listing: MetaListingSchema


class SearchResponseSchema(BaseModel):

    total: int
    metas: list[MetaResponseSchema] = []

