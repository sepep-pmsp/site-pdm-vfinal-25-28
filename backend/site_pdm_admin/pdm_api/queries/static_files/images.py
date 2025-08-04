from static_files.models.images import Imagem

def get_image_by_id(image_id: int) -> Imagem:
    """
    Retrieve an image by its ID.
    
    :param image_id: The ID of the image to retrieve.
    :return: An Image object if found, otherwise None.
    """
    return Imagem.objects.filter(id=image_id).first()