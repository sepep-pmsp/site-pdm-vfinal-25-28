from cadastros_basicos.models.vinculos_externos import PlanoSetorial


def get_all_planos_setoriais()->list[PlanoSetorial]:

    return list(PlanoSetorial.objects.all())