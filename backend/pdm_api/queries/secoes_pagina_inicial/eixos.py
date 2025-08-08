from estrutura_pdm.models.eixos import Eixo
from typing import List

def get_eixos() -> List[Eixo]:
    return Eixo.objects.all()
