from pydantic import BaseModel
from .regionalizacao import ParametroZonaSchema
from .orgaos import ParametroOrgaosSchema


class ParametrosGeral(BaseModel):

    regionalizacao: list[ParametroZonaSchema]
    orgaos: list[ParametroOrgaosSchema]