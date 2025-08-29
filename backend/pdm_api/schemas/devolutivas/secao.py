from pydantic import BaseModel
from .filtro import FiltroDevolutivaSchema
from .resultados import ListingDevolutivaSchema

class ModalApresentacaoSchema(BaseModel):

    imagem: str
    titulo: str
    subtitulo: str
    paragrafos: list[str]
    texto: str


class BoxDevolutivaSchema(BaseModel):

    imagem_fundo: str
    subtitulo: str
    paragrafos: str

class LinksAudienciasSchema(BaseModel):

    destaque: str
    lista: list[str]
    botao: str

class SecaoDevolutivaSchema(BaseModel):

    titulo: str
    subtitulo: str | None
    apresentacao: ModalApresentacaoSchema
    devolutivas: BoxDevolutivaSchema
    audiencia: LinksAudienciasSchema
    filtro: FiltroDevolutivaSchema
    results: list[ListingDevolutivaSchema] | None = None


    