from pydantic import BaseModel
from typing import List

class EixoSchema(BaseModel):
    
    id : int
    nome: str
    titulo: str
    cor_principal: str
    imagem: str
    imagem_card: str
    lista: List[str]
    texto: List[str]


