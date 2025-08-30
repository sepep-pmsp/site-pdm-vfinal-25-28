from pydantic import BaseModel


class FiltroDevolutivaSchema(BaseModel):

    canais: list[str]
    orgaos: list[str]
    subprefeituras: list[str]
    tema: list[str]

class FiltroDevolutivasRequestSchema(BaseModel):

    canais: list[str] | None = None
    orgaos: list[str] | None = None
    subprefeituras: list[str] | None = None
    temas: list[str] | None = None
