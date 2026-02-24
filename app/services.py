import requests
from flask import current_app
from .config import Config


def call_ml_api(endpoint: str, payload: dict):
    url = f"{Config.BASE_URL}{endpoint}"

    try:
        response = requests.post(
            url,
            json=payload,
            timeout=Config.REQUEST_TIMEOUT
        )
    except requests.Timeout:
        return {"error": "Upstream service timeout"}, 504
    except requests.RequestException:
        return {"error": "Upstream service unavailable"}, 503

    if response.status_code == 422:
        return {"error": "Validation failed in ML service"}, 422

    if response.status_code >= 500:
        return {"error": "Upstream ML service error"}, 502

    return response.json(), response.status_code