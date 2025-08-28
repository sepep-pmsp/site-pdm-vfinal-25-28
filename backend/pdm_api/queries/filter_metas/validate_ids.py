from django.db.models import Model


class IDInexistente(ValueError):
    pass


def validate_fk_ids(model: Model, ids: list[int])->list[int]:
    """
    Valida se os IDs fornecidos existem na tabela do modelo especificado.
    Retorna uma lista de IDs que não existem.
    """

    if not ids:
        return []

    existentes = model.objects.filter(id__in=ids).values_list('id', flat=True)
    inexistentes = set(ids) - set(existentes)
    if inexistentes:
        raise IDInexistente(f'IDs inexistentes para {model.__name__}: {list(inexistentes)}')
    return list(existentes)