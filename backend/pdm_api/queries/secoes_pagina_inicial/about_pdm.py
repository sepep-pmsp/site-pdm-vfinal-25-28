from secoes_pagina_inicial.models.about_pdm import AboutPDM

def get_about_pdm() -> AboutPDM:
    
    return AboutPDM.objects.filter(published=True).first()
