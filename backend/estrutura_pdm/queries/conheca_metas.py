from estrutura_pdm.models.conheca_metas import ConhecaMetas

def get_conheca_metas() -> ConhecaMetas:
    
    return ConhecaMetas.objects.filter(publicado=True).values(
        "nome", 
        "valor", 
        "ordem",
    )