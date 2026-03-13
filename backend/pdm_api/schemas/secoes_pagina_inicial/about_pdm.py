from pydantic import BaseModel
from typing import Optional

from .carta_prefeito import CartaPrefeitoSchema

class AboutPDMSchema(BaseModel):
    
    titulo: str
    subtitulo: str
    paragrafo: str
    link_img: str
    link_pdf_about: Optional[str] = None
    carta_prefeito: CartaPrefeitoSchema