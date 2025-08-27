from pydantic import BaseModel


class SearchParam(BaseModel):

    ods:  list[int] | None = None
    planos_setoriais: list[int] | None = None
    orgaos: list[int] | None = None
    eixos: list[int] | None = None
    temas: list[int] | None = None
    subprefeituras: list[int] | None = None
    zonas: list[int] | None = None

    termo_busca: str | None = None