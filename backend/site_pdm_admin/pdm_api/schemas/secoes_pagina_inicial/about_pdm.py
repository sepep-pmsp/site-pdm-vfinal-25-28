from pydantic import BaseModel


class AboutPDMSchema(BaseModel):
    
    titulo: str
    subtitulo: str
    paragrafo: str
    link_img: str