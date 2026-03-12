from pydantic import BaseModel

class ConhecaMetasSchema(BaseModel):
    nome: str
    recursos_empenhados: float
    metas_atingidas: int
    metas_mais_50: int
    metas_andamento_atingida: float
    execucao_total: float


