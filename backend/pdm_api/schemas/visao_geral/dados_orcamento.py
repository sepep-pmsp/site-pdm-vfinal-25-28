from pydantic import BaseModel

class OrcamentoEixoSchema(BaseModel):

    nome: str
    cor_principal: str
    qtd_metas: int
    orcamento: int

class DadosOrcamentoGeralSchema(BaseModel):

    orcamento_total: int
    total_metas: int
    orcamentos_por_eixo: list[OrcamentoEixoSchema]
