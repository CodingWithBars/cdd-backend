from fastapi import FastAPI, UploadFile, File
from model.model import load_model_and_predict
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import io

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Chicken Disease Detector API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((380, 380))  # EfficientNetB4 expects 380x380

        prediction, confidence = load_model_and_predict(image)
        return JSONResponse({
            "prediction": prediction,
            "confidence": float(confidence)
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
