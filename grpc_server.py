#!/usr/bin/env python3
"""
gRPC Digital Doctors Assistant Server
Implements the DigitalDoctorsAssistantService defined in digitaldoctors.proto
"""

import grpc
from google.protobuf import empty_pb2
from concurrent import futures
import logging
import asyncio

# Import generated protobuf classes
import digital_doctors_pb2
import digital_doctors_pb2_grpc

# Import your Flask service call wrapper
from app.services import call_ml_api
from app.utils import verify_prediction_consistency

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


class DigitalDoctorsAssistantServicer(digital_doctors_pb2_grpc.DigitalDoctorsAssistantServiceServicer):
    """
    gRPC implementation of the DigitalDoctorsAssistantService
    """

    def PredictRisk(self, request, context):
        """
        gRPC equivalent of POST /predict/risk
        """
        try:
            payload = {
                "age": request.age,
                "bmi": request.bmi,
                "systolic_bp": request.systolic_bp,
                "diastolic_bp": request.diastolic_bp,
                "severity_score": request.severity_score,
                "chronic_conditions": request.chronic_conditions,
            }

            result, status = call_ml_api("/predict/risk", payload)

            if status == 200:
                verify_prediction_consistency(result)

            probabilities = digital_doctors_pb2.RiskProbabilities(
                high=result["probabilities"].get("High", 0.0),
                medium=result["probabilities"].get("Medium", 0.0),
                low=result["probabilities"].get("Low", 0.0),
            )

            return digital_doctors_pb2.PredictRiskResponse(
                prediction=result.get("prediction", ""),
                confidence=result.get("confidence", 0.0),
                model=result.get("model", ""),
                probabilities=probabilities,
                success=result.get("success", False),
                warning=result.get("warning", ""),
            )

        except Exception as e:
            logger.error(f"PredictRisk failed: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return digital_doctors_pb2.PredictRiskResponse(
                prediction="",
                confidence=0.0,
                model="",
                probabilities=digital_doctors_pb2.RiskProbabilities(),
                success=False,
                warning=str(e),
            )

    def PredictTreatment(self, request, context):
        """
        gRPC equivalent of POST /predict/treatment
        """
        try:
            payload = {
                "patient_age": request.patient_age,
                "severity_score": request.severity_score,
                "compliance_rate": request.compliance_rate,
                "medication": request.medication,
                "condition": request.condition,
            }

            result, status = call_ml_api("/predict/treatment", payload)

            if status == 200:
                verify_prediction_consistency(result)

            probabilities = digital_doctors_pb2.TreatmentProbabilities(
                success=result["probabilities"].get("success", 0.0),
                failure=result["probabilities"].get("failure", 0.0),
            )

            return digital_doctors_pb2.PredictTreatmentResponse(
                prediction=result.get("prediction", 0),
                confidence=result.get("confidence", 0.0),
                model=result.get("model", ""),
                probabilities=probabilities,
                success=result.get("success", False),
                success_probability=result.get("success_probability", 0.0),
            )

        except Exception as e:
            logger.error(f"PredictTreatment failed: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return digital_doctors_pb2.PredictTreatmentResponse(
                prediction=0,
                confidence=0.0,
                model="",
                probabilities=digital_doctors_pb2.TreatmentProbabilities(),
                success=False,
                success_probability=0.0,
            )

    def HealthCheck(self, request, context):
        """
        gRPC equivalent of GET /health
        """
        return digital_doctors_pb2.HealthResponse(status="ok")


def serve():
    """
    Start the gRPC server
    """
    listen_addr = "[::]:50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    digital_doctors_pb2_grpc.add_DigitalDoctorsAssistantServiceServicer_to_server(
        DigitalDoctorsAssistantServicer(), server
    )
    server.add_insecure_port(listen_addr)
    server.start()
    logger.info(f"gRPC Digital Doctors Assistant Server running on {listen_addr}")

    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        logger.info("Shutting down gRPC server...")
        server.stop(5)


if __name__ == "__main__":
    serve()