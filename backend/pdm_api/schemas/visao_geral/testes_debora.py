from pydantic import BaseModel
from typing import Optional
from pdm_api.utils.transforma_type import transformar_str
from pydantic import BaseModel, model_validator, field_validator

class TestesDeboraSchema(BaseModel):
    nome: Optional[str]
    valor_aleatorio: Optional[str]
    ordem_aparicao: Optional[int]
    regra: bool

class TestesDeboraCardSchema(BaseModel):
    titulo: str
    list_testes_debora: list[TestesDeboraSchema]
    tipo: Optional['list'] = 'list'