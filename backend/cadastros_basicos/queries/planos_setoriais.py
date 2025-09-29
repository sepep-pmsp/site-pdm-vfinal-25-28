from cadastros_basicos.models.vinculos_externos import PlanoSetorial


def get_all_planos_setoriais()->list[PlanoSetorial]:

    return list(PlanoSetorial.objects.all())

def get_plano_by_nome(nome:str, raise_error=False)->PlanoSetorial|None:

    if raise_error:
        return PlanoSetorial.objects.get(nome=nome)
    else:
        try:
            return PlanoSetorial.objects.get(nome=nome)
        except PlanoSetorial.DoesNotExist:
            return None