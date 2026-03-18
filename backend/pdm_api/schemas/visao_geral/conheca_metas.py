from pydantic import BaseModel
from typing import Optional

class ConhecaMetasSchema(BaseModel):
    nome: Optional[str]
    recursos_empenhados: Optional[float]
    metas_atingidas: Optional[int]
    metas_mais_50: Optional[int]
    metas_andamento_atingida: Optional[float]
    execucao_total: Optional[float]


