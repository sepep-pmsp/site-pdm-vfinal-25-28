from pydantic import BaseModel


class ParametroPlanoSetorialSchema(BaseModel):

    id: int
    nome: str