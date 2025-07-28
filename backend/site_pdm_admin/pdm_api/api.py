from ninja import NinjaAPI
from pydantic import BaseModel
from typing import List

api = NinjaAPI()

class Item(BaseModel):
    name: str
    price: float


fake_db: List[Item] = []

@api.post("/items/", response=Item)
def create_item(request, item: Item):

    fake_db.append(item)
    return item

@api.get("/items/", response=List[Item])
def list_items(request):
    return fake_db
