from pydantic import BaseModel, model_validator
from datetime import datetime
from typing import List

class RespostaDevolutivaSchema(BaseModel):

    orgao: str
    texto: str

class DetailDevolutivaSchema(BaseModel):

    tipo: str
    titulo: str | None = None
    resumo: str | None = None
    conteudo: str | None = None
    apoios: int | None = None
    comentarios: int | None = None
    respostas: List[RespostaDevolutivaSchema]

    
    @model_validator(mode='after')
    def validate_content(self):

        if not (self.titulo or self.resumo or self.conteudo):
            raise ValueError("At least one of 'titulo', 'resumo', or 'conteudo' must have content")
        return self

class ListingDevolutivaSchema(BaseModel):

    nome: str
    canal: str
    subprefeituras: list[str]
    temas: list[str]
    detalhe: DetailDevolutivaSchema


