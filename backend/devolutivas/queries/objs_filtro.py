from devolutivas.models import Canal, Tema


def get_all_canais():
    return list(Canal.objects.values_list('nome', flat=True).distinct().order_by('nome'))

def get_all_temas():
    return list(Tema.objects.values_list('nome', flat=True).distinct().order_by('nome'))

