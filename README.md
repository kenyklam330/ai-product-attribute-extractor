# 🛒 AI Product Attribute Extractor (Hybrid Edition)
### Enterprise-Grade AI Data Pipeline with Cloud & Local LLM Support

## 📋 Overview
This project is an automated data pipeline designed to transform unstructured product descriptions into structured JSON attributes for e-commerce. It features a **Hybrid AI Strategy**, allowing the business to switch between high-performance Cloud LLMs and cost-effective Local LLMs based on the data sensitivity and budget.

## 🚀 Key Features
* **Hybrid Model Support:** Toggle between **Azure OpenAI (GPT-4o)** for complex reasoning and **Ollama (Llama 3)** for high-volume, cost-saving local processing.
* **Structured Output Engine:** Implements the Factory Pattern to ensure both Cloud and Local models adhere to a strict Pydantic-validated schema.
* **Asynchronous API:** Built with FastAPI to ensure non-blocking data extraction at scale.
* **Retail-Optimized Prompts:** Fine-tuned system instructions designed to extract technical specs (Resolution, Energy Rating, Screen Size) specific to Currys' product catalog.

## 🛠️ Tech Stack
* **Frontend:** React.js (State-managed selection for AI Provider)
* **Backend:** Python 3.10+, FastAPI
* **Orchestration:** LangChain (Partner Packages: `langchain-openai`, `langchain-ollama`)
* **Cloud AI:** Azure OpenAI Service
* **Local AI:** Ollama (Llama 3 / Mistral)
* **Validation:** Pydantic V2

## 🏗️ Hybrid Architecture


The system uses a **Provider Factory** pattern:
1. User selects the "Provider" via the React UI.
2. The request is routed through the FastAPI backend.
3. The `ModelFactory` initializes the requested LLM with a unified structured-output layer.
4. Results are validated against the `ProductAttributes` schema before being returned.

## ⚡ Installation & Setup

### 1. Local AI (Ollama)
* Install [Ollama](https://ollama.com).
* Run `ollama pull llama3` in your terminal.

### 2. Backend Setup
* `cd backend`
* `pip install -r requirements.txt`
* Configure `.env` with Azure credentials (if using Cloud mode).
* `uvicorn main:app --reload`

### 3. Frontend Setup
* `cd frontend`
* `npm install && npm start`

## 📈 Business Value
* **Operational Flexibility:** Switch to local models for internal data to avoid data egress costs and privacy concerns.
* **Reduced Latency:** Local inference for simple extraction tasks removes dependency on external API response times.
* **Accuracy:** Uses Pydantic to ensure 100% data integrity, preventing "hallucinations" from entering the production database.


---


## ☁️ Azure Deployment Guide

This project is architected for a seamless transition to **Azure App Service** using **Docker Compose**.

### 1. Infrastructure Setup (Azure CLI)
First, provision the container registry and resource group:
```bash
az group create --name CurrysAIDemo --location uksouth
az acr create --resource-group CurrysAIDemo --name currysregistry --sku Basic
az acr login --name currysregistry