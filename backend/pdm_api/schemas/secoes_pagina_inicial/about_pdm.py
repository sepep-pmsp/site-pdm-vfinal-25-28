from pydantic import BaseModel

from .carta_prefeito import CartaPrefeitoSchema

class AboutPDMSchema(BaseModel):
    
    titulo: str
    subtitulo: str
    paragrafo: str
    link_img: str
    carta_prefeito: CartaPrefeitoSchema