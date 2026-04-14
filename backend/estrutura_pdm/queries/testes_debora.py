from estrutura_pdm.models.testes_debora import TestesDebora

def get_testes_debora()-> TestesDebora:
    return TestesDebora.objects.values(
        "nome",
        "valor_aleatorio",
        "ordem_aparicao",
        "regra",
    )