from pydantic import BaseModel


class CartaPrefeitoSchema(BaseModel):
    titulo: str
    nome_prefeito: str
    paragrafos: list[str]