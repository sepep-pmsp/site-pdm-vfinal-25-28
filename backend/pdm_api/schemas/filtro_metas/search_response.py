from pydantic import BaseModel, model_validator, field_validator
from typing import Optional, Literal
from estrutura_pdm.models.metas.status_monitoramento import StatusMonitoramento
from datetime import date

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
    
#Ações Estrategicas
class AcaoEstrategicaSchema(BaseModel):
    numero: str
    descricao: str
    concluida: bool

class AcoesEstrategicasCardSchema(BaseModel):

    titulo: str
    valor: list[AcaoEstrategicaSchema]
    tipo: Literal['list'] = 'list'

    @model_validator(mode='after')
    def validate_tipo(self):
        if self.tipo != 'list':
            raise ValueError('Invalid tipo for AcoesEstrategicasCardSchema')
        return self

#Resultados Apurados
class ResultadoApuradoSchema(BaseModel):
    qtdd_resultados_apurados: int
    mes: str
    ano: int
    data: date

class ResultadosApuradosCardSchema(BaseModel):

    titulo: str
    valor: list[ResultadoApuradoSchema]
    tipo: Literal['list'] = 'list'

    @model_validator(mode='after')
    def validate_tipo(self):
        if self.tipo != 'list':
            raise ValueError('Invalid tipo for ResultadosApuradosCardSchema')
        return self

# Mapas
## MapasAbstract
class MapaSchema(BaseModel):
    status_regionalizacao: Literal["não regionalizável", "regionalizável", "regionalizada"]
    map_image: Optional[str]=None
    map_legenda: Optional[str]=None
    map_rodape: Optional[str]=None

## MapaMeta
class MetaMapSchema(BaseModel):
    
    status_regionalizacao: Literal["não regionalizável", "regionalizável", "regionalizada"]
    nota_regionalizacao: Optional[str]=None #frase_regionalizacao

# Meta
class MetaCardSchema(BaseModel):

    numero: str
    projecao: AtributoStrCardSchema
    acoes_estrategicas: Optional[AcoesEstrategicasCardSchema]=None
    indicador: AtributoStrCardSchema
    orgaos_responsaveis: AtributoListCardSchema
    eixo_nome: str
    eixo_cor_principal: str
    eixo_cor_secundaria: str
    eixo_frase: list[str]=[]
    evolucao: Optional[str]=None
    monitoramento: StatusMonitoramento
    resultados_apurados: Optional[ResultadosApuradosCardSchema]=None
    regionalizacao_metamap: MetaMapSchema
    regionalizacao_planejado: MapaSchema
    regionalizacao_executado: MapaSchema

    

    

class MetaResponseSchema(BaseModel):

    id: str
    card: MetaCardSchema
    listing: MetaListingSchema


class SearchResponseSchema(BaseModel):

    total: int
    metas: list[MetaResponseSchema] = []

