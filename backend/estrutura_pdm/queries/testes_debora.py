from estrutura_pdm.models.testes_debora import TestesDebora

# def get_testes_debora()-> TestesDebora:

#     testes_debora_resultados = TestesDebora.objects.values(
#         "nome",
#         "valor_aleatorio",
#         "ordem_aparicao",
#         "regra"
#     )

#     testes_debora_resultados['abinha_as_list'] = TestesDebora.abinha_as_list()
#     return testes_debora_resultados

def get_testes_debora():

    testes = TestesDebora.objects.all()

    resultados = []

    for t in testes:
        resultados.append({
            "nome": t.nome,
            "valor_aleatorio": t.valor_aleatorio,
            "ordem_aparicao": t.ordem_aparicao,
            "regra": t.regra,
            "abinha_as_list": t.abinha_as_list
        })

    return resultados