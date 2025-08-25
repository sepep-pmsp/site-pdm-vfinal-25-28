from pydantic import BaseModel


class SecaoRegionalizacaoSchema(BaseModel):

    titulo: str
    subtitulo: str
    instrucao: str
    paragrafo: str

    link_arquivo: str
    link_dashboard: str
