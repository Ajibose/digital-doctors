// package: digitaldoctors
// file: digital-doctors.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class PredictRiskRequest extends jspb.Message {
  getAge(): number;
  setAge(value: number): void;

  getBmi(): number;
  setBmi(value: number): void;

  getSystolicBp(): number;
  setSystolicBp(value: number): void;

  getDiastolicBp(): number;
  setDiastolicBp(value: number): void;

  getSeverityScore(): number;
  setSeverityScore(value: number): void;

  getChronicConditions(): string;
  setChronicConditions(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictRiskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PredictRiskRequest): PredictRiskRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictRiskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictRiskRequest;
  static deserializeBinaryFromReader(message: PredictRiskRequest, reader: jspb.BinaryReader): PredictRiskRequest;
}

export namespace PredictRiskRequest {
  export type AsObject = {
    age: number,
    bmi: number,
    systolicBp: number,
    diastolicBp: number,
    severityScore: number,
    chronicConditions: string,
  }
}

export class RiskProbabilities extends jspb.Message {
  getHigh(): number;
  setHigh(value: number): void;

  getMedium(): number;
  setMedium(value: number): void;

  getLow(): number;
  setLow(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RiskProbabilities.AsObject;
  static toObject(includeInstance: boolean, msg: RiskProbabilities): RiskProbabilities.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RiskProbabilities, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RiskProbabilities;
  static deserializeBinaryFromReader(message: RiskProbabilities, reader: jspb.BinaryReader): RiskProbabilities;
}

export namespace RiskProbabilities {
  export type AsObject = {
    high: number,
    medium: number,
    low: number,
  }
}

export class PredictRiskResponse extends jspb.Message {
  getPrediction(): string;
  setPrediction(value: string): void;

  getConfidence(): number;
  setConfidence(value: number): void;

  getModel(): string;
  setModel(value: string): void;

  hasProbabilities(): boolean;
  clearProbabilities(): void;
  getProbabilities(): RiskProbabilities | undefined;
  setProbabilities(value?: RiskProbabilities): void;

  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getWarning(): string;
  setWarning(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictRiskResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PredictRiskResponse): PredictRiskResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictRiskResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictRiskResponse;
  static deserializeBinaryFromReader(message: PredictRiskResponse, reader: jspb.BinaryReader): PredictRiskResponse;
}

export namespace PredictRiskResponse {
  export type AsObject = {
    prediction: string,
    confidence: number,
    model: string,
    probabilities?: RiskProbabilities.AsObject,
    success: boolean,
    warning: string,
  }
}

export class PredictTreatmentRequest extends jspb.Message {
  getPatientAge(): number;
  setPatientAge(value: number): void;

  getSeverityScore(): number;
  setSeverityScore(value: number): void;

  getComplianceRate(): number;
  setComplianceRate(value: number): void;

  getMedication(): string;
  setMedication(value: string): void;

  getCondition(): string;
  setCondition(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictTreatmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PredictTreatmentRequest): PredictTreatmentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictTreatmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictTreatmentRequest;
  static deserializeBinaryFromReader(message: PredictTreatmentRequest, reader: jspb.BinaryReader): PredictTreatmentRequest;
}

export namespace PredictTreatmentRequest {
  export type AsObject = {
    patientAge: number,
    severityScore: number,
    complianceRate: number,
    medication: string,
    condition: string,
  }
}

export class TreatmentProbabilities extends jspb.Message {
  getSuccess(): number;
  setSuccess(value: number): void;

  getFailure(): number;
  setFailure(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TreatmentProbabilities.AsObject;
  static toObject(includeInstance: boolean, msg: TreatmentProbabilities): TreatmentProbabilities.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TreatmentProbabilities, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TreatmentProbabilities;
  static deserializeBinaryFromReader(message: TreatmentProbabilities, reader: jspb.BinaryReader): TreatmentProbabilities;
}

export namespace TreatmentProbabilities {
  export type AsObject = {
    success: number,
    failure: number,
  }
}

export class PredictTreatmentResponse extends jspb.Message {
  getPrediction(): number;
  setPrediction(value: number): void;

  getConfidence(): number;
  setConfidence(value: number): void;

  getModel(): string;
  setModel(value: string): void;

  hasProbabilities(): boolean;
  clearProbabilities(): void;
  getProbabilities(): TreatmentProbabilities | undefined;
  setProbabilities(value?: TreatmentProbabilities): void;

  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getSuccessProbability(): number;
  setSuccessProbability(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictTreatmentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PredictTreatmentResponse): PredictTreatmentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictTreatmentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictTreatmentResponse;
  static deserializeBinaryFromReader(message: PredictTreatmentResponse, reader: jspb.BinaryReader): PredictTreatmentResponse;
}

export namespace PredictTreatmentResponse {
  export type AsObject = {
    prediction: number,
    confidence: number,
    model: string,
    probabilities?: TreatmentProbabilities.AsObject,
    success: boolean,
    successProbability: number,
  }
}

export class HealthResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HealthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HealthResponse): HealthResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HealthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HealthResponse;
  static deserializeBinaryFromReader(message: HealthResponse, reader: jspb.BinaryReader): HealthResponse;
}

export namespace HealthResponse {
  export type AsObject = {
    status: string,
  }
}

