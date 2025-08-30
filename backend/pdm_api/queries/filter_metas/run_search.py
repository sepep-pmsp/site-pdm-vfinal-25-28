
from django.db.models import QuerySet

from estrutura_pdm.models.metas import Meta
from pdm_api.schemas.filtro_metas.search_param import SearchParamSchema

from .fk_searchs import (
filter_by_ods,
filter_by_planos_setoriais,
filter_by_eixos,
filter_by_temas,
filter_by_orgao_responsavel,
filter_by_subprefeituras_entregas,
filter_by_zonas_entregas
)

from .text_search import text_search

class SearchMeta:


    search_func_map =  {
        'ods' : filter_by_ods,
        'planos_setoriais': filter_by_planos_setoriais,
        'eixos': filter_by_eixos,
        'temas': filter_by_temas,
        'orgaos': filter_by_orgao_responsavel,
        'subprefeituras': filter_by_subprefeituras_entregas,
        'zonas': filter_by_zonas_entregas,
        'termo_busca': text_search
    }

    related_fields = [
        ('ods_relacionados', True),
        ('planos_setoriais_relacionados', True),
        ('eixo', False),
        ('tema', False),
        ('orgaos_responsaveis', True),
        ('subprefeituras_entregas', True),
        ('zonas_entregas', True),
    ]


    def __init__(self, params: SearchParamSchema):

        self.params = params

    @property
    def many_to_many_related_fields(self)->list[str]:
        return [field for field, is_many in self.related_fields if is_many]
    
    @property
    def foreignkey_related_fields(self)->list[str]:
        return [field for field, is_many in self.related_fields if not is_many]


    def pre_load_metas(self)->QuerySet:

        queryset = (Meta.objects.all()
                    .select_related(*self.foreignkey_related_fields)
                    .prefetch_related(*self.many_to_many_related_fields))
        return queryset

    def run_text_search(self, queryset: QuerySet) -> QuerySet:

        if not self.params.termo_busca:
            return queryset

        return text_search(queryset, self.params.termo_busca)

    def run_fk_search(self, queryset:QuerySet, attr_name:str)->QuerySet:

        if attr_name not in self.search_func_map:
            raise NotImplementedError(f"Search function for attribute '{attr_name}' is not implemented.")
        
        searched_ids = getattr(self.params, attr_name)
        if not searched_ids:
            return queryset

        return self.search_func_map[attr_name](queryset, searched_ids)
    
    def pipeline(self)->QuerySet:

        queryset = self.pre_load_metas()

        for attr_name in self.search_func_map:
            if attr_name == 'termo_busca':
                queryset = self.run_text_search(queryset)
            else:
                queryset = self.run_fk_search(queryset, attr_name)

        return queryset.distinct()
    
    def __call__(self)->QuerySet:
        return self.pipeline()