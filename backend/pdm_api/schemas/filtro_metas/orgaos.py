from pydantic import BaseModel

class ParametroOrgaosSchema(BaseModel):

    id: int
    sigla: str
    nome: str