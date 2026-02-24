#!/usr/bin/env python3
"""
gRPC Digital Doctors Assistant Client
Connects to the DigitalDoctorsAssistantService gRPC server to:
- Predict risk
- Predict treatment
- Perform health checks
"""

import grpc
import sys
import argparse
import json
from google.protobuf import empty_pb2

import digital_doctors_pb2
import digital_doctors_pb2_grpc


class DigitalDoctorsClient:
    def __init__(self, server_address="localhost:50051"):
        self.server_address = server_address
        self.channel = None
        self.stub = None

    def connect(self) -> bool:
        try:
            print(f"🔗 Connecting to gRPC Digital Doctors Assistant at {self.server_address}...")
            self.channel = grpc.insecure_channel(self.server_address)
            self.stub = digital_doctors_pb2_grpc.DigitalDoctorsAssistantServiceStub(self.channel)
            grpc.channel_ready_future(self.channel).result(timeout=5)
            print("✅ Connected successfully")
            return True
        except grpc.FutureTimeoutError:
            print("❌ Connection timeout")
            return False
        except Exception as e:
            print(f"❌ Connection failed: {e}")
            return False

    def close(self):
        if self.channel:
            self.channel.close()
            print("🔌 Connection closed")

    # ---------- RPC METHODS ----------

    def predict_risk(self, payload: dict) -> dict | None:
        if not self.stub:
            print("❌ Not connected")
            return None

        try:
            request = digital_doctors_pb2.PredictRiskRequest(
                age=payload["age"],
                bmi=payload["bmi"],
                systolic_bp=payload["systolic_bp"],
                diastolic_bp=payload["diastolic_bp"],
                severity_score=payload["severity_score"],
                chronic_conditions=payload["chronic_conditions"],
            )
            response = self.stub.PredictRisk(request)
            return {
                "prediction": response.prediction,
                "confidence": response.confidence,
                "model": response.model,
                "probabilities": {
                    "high": response.probabilities.high,
                    "medium": response.probabilities.medium,
                    "low": response.probabilities.low,
                },
                "success": response.success,
                "warning": response.warning,
            }
        except grpc.RpcError as e:
            print(f"❌ gRPC Error [{e.code()}]: {e.details()}")
            return None

    def predict_treatment(self, payload: dict) -> dict | None:
        if not self.stub:
            print("❌ Not connected")
            return None

        try:
            request = digital_doctors_pb2.PredictTreatmentRequest(
                patient_age=payload["patient_age"],
                severity_score=payload["severity_score"],
                compliance_rate=payload["compliance_rate"],
                medication=payload["medication"],
                condition=payload["condition"],
            )
            response = self.stub.PredictTreatment(request)
            return {
                "prediction": response.prediction,
                "confidence": response.confidence,
                "model": response.model,
                "probabilities": {
                    "success": response.probabilities.success,
                    "failure": response.probabilities.failure,
                },
                "success": response.success,
                "success_probability": response.success_probability,
            }
        except grpc.RpcError as e:
            print(f"❌ gRPC Error [{e.code()}]: {e.details()}")
            return None

    def health_check(self) -> dict | None:
        if not self.stub:
            print("❌ Not connected")
            return None
        try:
            response = self.stub.HealthCheck(empty_pb2.Empty())
            return {"status": response.status}
        except grpc.RpcError as e:
            print(f"❌ gRPC Error [{e.code()}]: {e.details()}")
            return None


# ---------- CLI ----------

def main():
    parser = argparse.ArgumentParser(description="Digital Doctors Assistant gRPC Client")
    parser.add_argument("--server", default="localhost:50051")

    # Risk
    parser.add_argument("--risk", action="store_true", help="Predict patient risk")
    parser.add_argument("--risk-json", help="Path to JSON file with risk request payload")

    # Treatment
    parser.add_argument("--treatment", action="store_true", help="Predict treatment outcome")
    parser.add_argument("--treatment-json", help="Path to JSON file with treatment request payload")

    # Utility
    parser.add_argument("--health", action="store_true", help="Perform health check")

    args = parser.parse_args()

    client = DigitalDoctorsClient(args.server)
    if not client.connect():
        sys.exit(1)

    try:
        if args.health:
            result = client.health_check()
            print(json.dumps(result, indent=2) if result else "❌ Health check failed")

        elif args.risk:
            if not args.risk_json:
                print("❌ --risk-json required for risk prediction")
                sys.exit(1)
            with open(args.risk_json) as f:
                payload = json.load(f)
            result = client.predict_risk(payload)
            if result:
                print(json.dumps(result, indent=2))

        elif args.treatment:
            if not args.treatment_json:
                print("❌ --treatment-json required for treatment prediction")
                sys.exit(1)
            with open(args.treatment_json) as f:
                payload = json.load(f)
            result = client.predict_treatment(payload)
            if result:
                print(json.dumps(result, indent=2))

        else:
            print("❌ No action specified")
            sys.exit(1)

    finally:
        client.close()


if __name__ == "__main__":
    main()