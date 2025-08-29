from pydantic import BaseModel


class FiltroDevolutivaSchema(BaseModel):

    canais: list[str]
    orgaos: list[str]
    subprefeituras: list[str]
    tema: list[str]
