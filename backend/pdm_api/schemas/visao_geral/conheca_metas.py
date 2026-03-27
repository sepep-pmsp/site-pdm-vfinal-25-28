from pydantic import BaseModel
from typing import Optional
from pdm_api.utils.transforma_type import transformar_str
from pydantic import BaseModel, model_validator, field_validator


class ConhecaMetasSchema(BaseModel):
    nome: Optional[str]
    valor: Optional[str]
    ordem: Optional[int]

    @field_validator("valor", mode="before")
    @classmethod
    def value_as_str(cls, value):
        return transformar_str(value=value)
    
class ConhecaMetasCardSchema(BaseModel):
    titulo: str
    list_conheca_metas: list[ConhecaMetasSchema]
    tipo: Optional['list'] = 'list'

    @model_validator(mode='after')
    def validate_tipo(self):
        if self.tipo != 'list':
            raise ValueError('Invalid tipo for ConhecaMetasCardSchema')
        return self




