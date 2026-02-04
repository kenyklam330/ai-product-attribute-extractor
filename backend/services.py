import os
from langchain_openai import AzureChatOpenAI
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from schemas import ProductAttributes
from dotenv import load_dotenv

load_dotenv()

def get_model(provider: str):
    """Factory function to switch between providers"""
    if provider.lower() == "azure":
        llm = AzureChatOpenAI(
            azure_deployment=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
            temperature=0
        )
    else:
        # Assumes Ollama is running locally on port 11434
        llm = ChatOllama(
            model="llama3", # Or 'mistral', 'phi3', etc.
            temperature=0
        )
    
    # Both providers support .with_structured_output in modern LangChain
    return llm.with_structured_output(ProductAttributes)

async def extract_product_data(raw_text: str, provider: str = "azure") -> ProductAttributes:
    structured_llm = get_model(provider)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a Currys Data Engineer. Extract specs into JSON."),
        ("human", "{text}")
    ])
    
    chain = prompt | structured_llm
    return await chain.ainvoke({"text": raw_text})