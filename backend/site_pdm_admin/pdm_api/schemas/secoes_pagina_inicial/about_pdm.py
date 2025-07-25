from pydantic import BaseModel


class AboutPDM(BaseModel):
    
    titulo: str
    subtitulo: str
    paragrafo: str
    banner_img_url: str