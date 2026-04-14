from pydantic import BaseModel
from typing import Optional, Literal
from pdm_api.utils.transforma_type import transformar_str
from pydantic import BaseModel, model_validator, field_validator

## Abinha
class AbinhaSchema(BaseModel):
    cor_abinha:Optional[str]
    fruta:str
    quantidade_abinha:Optional[int]
    #teste_relacionado

class AbinhaCardSchema(BaseModel):
    titulo:str
    valor: list[AbinhaSchema]
    tipo: Literal['list'] = 'list'





# Testes Débora
class TestesDeboraSchema(BaseModel):
    nome: Optional[str]
    valor_aleatorio: Optional[str]
    ordem_aparicao: Optional[int]
    regra: bool
    abinha_da_debora: Optional[AbinhaCardSchema]=None

class TestesDeboraCardSchema(BaseModel):
    titulo: str
    list_testes_debora: list[TestesDeboraSchema]
    tipo: Optional['list'] = 'list'
