from pydantic import BaseModel

class ParametroSubprefeituraSchema(BaseModel):

    id: int
    sigla: str
    nome: str


class ParametroZonaSchema(BaseModel):

    id: int
    sigla: str
    nome: str
    subprefeituras: list[ParametroSubprefeituraSchema]