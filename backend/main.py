from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import ProductAttributes
from services import extract_product_data

app = FastAPI(title="AI Product Attribute Extractor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your Azure URL
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract", response_model=ProductAttributes)
async def extract_attributes(raw_text: str, provider: str = "azure"):
    try:
        # Pass the provider choice to the service
        data = await extract_product_data(raw_text, provider)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))