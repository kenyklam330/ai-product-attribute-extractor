from pydantic import BaseModel
from typing import List, Optional

class ProductAttributes(BaseModel):
    brand: str
    model_name: str
    resolution: Optional[str] = "N/A"
    screen_size: Optional[str] = "N/A"
    energy_rating: Optional[str] = "N/A"
    key_features: List[str]