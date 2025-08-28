from django.db.models import QuerySet, Q
from estrutura_pdm.models.metas import Meta


CAMPOS_BUSCA = ['destaque', 'descricao', 'indicador', 'projecao']

def text_search(queryset:QuerySet, text:str)->QuerySet:
    """
    Realiza uma busca textual simples no campo 'descricao' do modelo Meta.
    """
    if not text:
        return queryset
    
    text = text.strip()
    if not text:
        return queryset

    cond = Q()
    for campo in CAMPOS_BUSCA:
        cond |= Q(**{f"{campo}__icontains": text})
        
    queryset = queryset.filter(cond).distinct()

    return queryset