from pydantic import BaseModel
from .regionalizacao import ParametroZonaSchema
from .orgaos import ParametroOrgaosSchema
from .eixos import ParametrosEixosSchema
from .ods import ParametroODSSchema
from .planos_setoriais import ParametroPlanoSetorialSchema

class ParametrosGeral(BaseModel):

    regionalizacao: list[ParametroZonaSchema]
    orgaos: list[ParametroOrgaosSchema]
    eixos: list[ParametrosEixosSchema]
    planos_setoriais: list[ParametroPlanoSetorialSchema]
    ods: list[ParametroODSSchema]
    