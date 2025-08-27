from pydantic import BaseModel
from .regionalizacao import ParametroZonaSchema
from .orgaos import ParametroOrgaosSchema
from .eixos import ParametrosEixosSchema


class ParametrosGeral(BaseModel):

    regionalizacao: list[ParametroZonaSchema]
    orgaos: list[ParametroOrgaosSchema]
    eixos: list[ParametrosEixosSchema]