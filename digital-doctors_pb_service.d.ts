// package: digitaldoctors
// file: digital-doctors.proto

import * as digital_doctors_pb from "./digital-doctors_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DigitalDoctorsAssistantServicePredictRisk = {
  readonly methodName: string;
  readonly service: typeof DigitalDoctorsAssistantService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof digital_doctors_pb.PredictRiskRequest;
  readonly responseType: typeof digital_doctors_pb.PredictRiskResponse;
};

type DigitalDoctorsAssistantServicePredictTreatment = {
  readonly methodName: string;
  readonly service: typeof DigitalDoctorsAssistantService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof digital_doctors_pb.PredictTreatmentRequest;
  readonly responseType: typeof digital_doctors_pb.PredictTreatmentResponse;
};

type DigitalDoctorsAssistantServiceHealthCheck = {
  readonly methodName: string;
  readonly service: typeof DigitalDoctorsAssistantService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof digital_doctors_pb.HealthResponse;
};

export class DigitalDoctorsAssistantService {
  static readonly serviceName: string;
  static readonly PredictRisk: DigitalDoctorsAssistantServicePredictRisk;
  static readonly PredictTreatment: DigitalDoctorsAssistantServicePredictTreatment;
  static readonly HealthCheck: DigitalDoctorsAssistantServiceHealthCheck;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class DigitalDoctorsAssistantServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  predictRisk(
    requestMessage: digital_doctors_pb.PredictRiskRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: digital_doctors_pb.PredictRiskResponse|null) => void
  ): UnaryResponse;
  predictRisk(
    requestMessage: digital_doctors_pb.PredictRiskRequest,
    callback: (error: ServiceError|null, responseMessage: digital_doctors_pb.PredictRiskResponse|null) => void
  ): UnaryResponse;
  predictTreatment(
    requestMessage: digital_doctors_pb.PredictTreatmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: digital_doctors_pb.PredictTreatmentResponse|null) => void
  ): UnaryResponse;
  predictTreatment(
    requestMessage: digital_doctors_pb.PredictTreatmentRequest,
    callback: (error: ServiceError|null, responseMessage: digital_doctors_pb.PredictTreatmentResponse|null) => void
  ): UnaryResponse;
  healthCheck(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: digital_doctors_pb.HealthResponse|null) => void
  ): UnaryResponse;
  healthCheck(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: digital_doctors_pb.HealthResponse|null) => void
  ): UnaryResponse;
}

