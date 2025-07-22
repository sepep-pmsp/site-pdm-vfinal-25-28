from ninja import NinjaAPI
from pydantic import BaseModel
from typing import List

api = NinjaAPI()

# Modelo de entrada para POST
class Item(BaseModel):
    name: str
    price: float

# Modelo de saída (opcional, pode ser o mesmo de entrada)
class ItemOut(BaseModel):
    name: str
    price: float

# Armazena os itens em memória (exemplo simples)
fake_db: List[Item] = []

@api.post("/items/", response=ItemOut)
def create_item(request, item: Item):
    fake_db.append(item)
    return item

@api.get("/items/", response=List[ItemOut])
def list_items(request):
    return fake_db
