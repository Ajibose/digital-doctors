// package: digitaldoctors
// file: digital-doctors.proto

var digital_doctors_pb = require("./digital-doctors_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var DigitalDoctorsAssistantService = (function () {
  function DigitalDoctorsAssistantService() {}
  DigitalDoctorsAssistantService.serviceName = "digitaldoctors.DigitalDoctorsAssistantService";
  return DigitalDoctorsAssistantService;
}());

DigitalDoctorsAssistantService.PredictRisk = {
  methodName: "PredictRisk",
  service: DigitalDoctorsAssistantService,
  requestStream: false,
  responseStream: false,
  requestType: digital_doctors_pb.PredictRiskRequest,
  responseType: digital_doctors_pb.PredictRiskResponse
};

DigitalDoctorsAssistantService.PredictTreatment = {
  methodName: "PredictTreatment",
  service: DigitalDoctorsAssistantService,
  requestStream: false,
  responseStream: false,
  requestType: digital_doctors_pb.PredictTreatmentRequest,
  responseType: digital_doctors_pb.PredictTreatmentResponse
};

DigitalDoctorsAssistantService.HealthCheck = {
  methodName: "HealthCheck",
  service: DigitalDoctorsAssistantService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: digital_doctors_pb.HealthResponse
};

exports.DigitalDoctorsAssistantService = DigitalDoctorsAssistantService;

function DigitalDoctorsAssistantServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DigitalDoctorsAssistantServiceClient.prototype.predictRisk = function predictRisk(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DigitalDoctorsAssistantService.PredictRisk, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

DigitalDoctorsAssistantServiceClient.prototype.predictTreatment = function predictTreatment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DigitalDoctorsAssistantService.PredictTreatment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

DigitalDoctorsAssistantServiceClient.prototype.healthCheck = function healthCheck(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DigitalDoctorsAssistantService.HealthCheck, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.DigitalDoctorsAssistantServiceClient = DigitalDoctorsAssistantServiceClient;

