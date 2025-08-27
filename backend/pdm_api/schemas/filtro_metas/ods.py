from pydantic import BaseModel

class ParametroODSSchema(BaseModel):

    id: int
    numero: int
    nome: str
    cor: str
    icone: str