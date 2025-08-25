from pydantic import BaseModel
from typing import List


class DocumentoHistoricoSchema(BaseModel):

    tipo: str
    nome: str
    url: str


class CardHistoricoSchema(BaseModel):

    id: str
    imagem: str
    cor_principal: str
    cor_botao: str
    documentos: List[DocumentoHistoricoSchema]


class HistoricoSchema(BaseModel):

    titulo: str
    instrucao: str
    paragrafo: str
    cards: List[CardHistoricoSchema]
