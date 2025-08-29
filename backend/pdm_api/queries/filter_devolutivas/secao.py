from devolutivas.models.secao import SecaoParticipacao


def get_secao()->SecaoParticipacao:

    #por enquanto estou implementado first
    #mais tarde tem que ser o published

    secao = SecaoParticipacao.objects.first()
    return secao