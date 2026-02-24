from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from .schemas import RiskRequest, TreatmentRequest
from .services import call_ml_api
from .utils import verify_prediction_consistency

bp = Blueprint("api", __name__)


@bp.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@bp.route("/predict/risk", methods=["POST"])
def predict_risk():
    try:
        validated = RiskRequest(**request.json)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 422

    result, status = call_ml_api("/predict/risk", validated.model_dump())

    if status == 200:
        verify_prediction_consistency(result)

    return jsonify(result), status


@bp.route("/predict/treatment", methods=["POST"])
def predict_treatment():
    try:
        validated = TreatmentRequest(**request.json)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 422

    result, status = call_ml_api(
        "/predict/treatment",
        validated.model_dump()
    )

    if status == 200:
        verify_prediction_consistency(result)

    return jsonify(result), status