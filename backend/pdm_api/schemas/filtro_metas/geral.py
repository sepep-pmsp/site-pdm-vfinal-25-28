from pydantic import BaseModel
from .regionalizacao import ParametroZonaSchema


class ParametrosGeral(BaseModel):

    regionalizacao: list[ParametroZonaSchema]