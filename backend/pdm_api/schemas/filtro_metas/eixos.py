from pydantic import BaseModel

class ParametrosTemasSchema(BaseModel):

    id: int
    nome: str


class ParametrosEixosSchema(BaseModel):

    id: int
    nome: str
    cor: str
    temas: list[ParametrosTemasSchema]