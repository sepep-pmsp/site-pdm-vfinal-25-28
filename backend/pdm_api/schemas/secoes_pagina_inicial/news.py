from pydantic import BaseModel


class NoticiaSchema(BaseModel):
    
    titulo: str
    link: str
    data: str
    prioridade: int