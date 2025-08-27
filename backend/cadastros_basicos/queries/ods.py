from cadastros_basicos.models.vinculos_externos.ods import ODS


def get_all_ods()->list[ODS]:
    """
    Retorna todos os ODS disponíveis.
    """
    return list(ODS.objects.all())