from ninja import NinjaAPI
from ninja.errors import HttpError
from .routers.static_files import router as static_files_router
from .routers.secoes_pagina_inicial import router as secoes_pagina_inicial_router
from .routers.visao_geral import router as visao_geral_router


api = NinjaAPI(
    title='PDM 25/28 API',
    description='API para o Backend do Site do PDM 25-28 da Prefeitura de São Paulo',
    version='1.0.0',
    docs_url='/'
)

@api.exception_handler(HttpError)
def on_http_error(request, exc: HttpError):
    return api.create_response(
        request,
        {"detail": exc.message, "status_code": exc.status_code},
        status=exc.status_code,
    )


api.add_router("/static", static_files_router)
api.add_router("/secoes_pagina_inicial", secoes_pagina_inicial_router)
api.add_router("/visao_geral", visao_geral_router)