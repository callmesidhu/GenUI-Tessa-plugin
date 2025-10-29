from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

FIGMA_TOKEN = os.getenv("FIGMA_TOKEN")
FILE_KEY = os.getenv("FILE_KEY")

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Tessa FastAPI Server is Running"}

@app.get("/fetch")
def get_figma_json():
    """Fetch and print the Figma MCP JSON"""
    if not FIGMA_TOKEN or not FILE_KEY:
        return {"error": "Missing FIGMA_TOKEN or FILE_KEY in .env"}

    url = f"https://api.figma.com/v1/files/{FILE_KEY}"
    headers = {"X-Figma-Token": FIGMA_TOKEN}

    print("Fetching Figma MCP JSON...")
    res = requests.get(url, headers=headers)

    if res.status_code == 200:
        data = res.json()
        print("MCP JSON Output:")
        print(json.dumps(data, indent=2))
        return {"status": "ok", "message": "MCP JSON printed to console"}
    else:
        print(f"Error {res.status_code}: {res.text}")
        return {"error": f"Failed to fetch JSON - {res.status_code}"}
