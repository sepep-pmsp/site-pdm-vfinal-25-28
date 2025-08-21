from pydantic import BaseModel
from typing import Optional

class CardSecaoTransparenciaSchema(BaseModel):

    subtitulo:str
    paragrafo:str
    ordem:int
    nome_btn:str
    link:str



class SecaoTransparenciaSchema(BaseModel):

    titulo: str
    subtitulo: Optional[str]=None
    recursos: list[CardSecaoTransparenciaSchema] = []
