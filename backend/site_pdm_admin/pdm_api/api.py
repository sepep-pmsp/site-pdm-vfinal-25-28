from ninja import NinjaAPI
from django.http import FileResponse
from typing import List

from .queries.static_files import get_image_by_id

api = NinjaAPI()

@api.get("/images/{image_id}")
def get_image(request, image_id: int) -> FileResponse:
    """
    Retrieve an image by its ID.
    """
    image = get_image_by_id(image_id)
    if not image:
        return FileResponse(status=404)
    content_type = f'image/{image.formato}'
    return FileResponse(image.arquivo.open('rb'), content_type=content_type)