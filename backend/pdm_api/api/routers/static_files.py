from ninja import Router
from django.http import FileResponse
from ninja.errors import HttpError

from pdm_api.queries.static_files import get_image_by_id
from pdm_api.utils.static_files.images import get_content_type

router = Router(tags=["Imagens"])

@router.get("/images/{image_id}")
def image(request, image_id: int) -> FileResponse:
    """
    Retrieve an image by its ID.
    """
    image = get_image_by_id(image_id)
    if not image:
        return FileResponse(status=404)
    content_type = get_content_type(image)
    return FileResponse(image.arquivo.open('rb'), content_type=content_type)