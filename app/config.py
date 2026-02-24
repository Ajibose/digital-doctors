import os

class Config:
    BASE_URL = os.getenv(
        "ML_API_BASE_URL",
        "https://tegaconsult-digital-doctors-assistant-api.hf.space"
    )
    REQUEST_TIMEOUT = float(os.getenv("REQUEST_TIMEOUT", 5))