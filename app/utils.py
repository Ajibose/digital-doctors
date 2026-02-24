def verify_prediction_consistency(response_json: dict):
    if "probabilities" not in response_json:
        return

    probabilities = response_json["probabilities"]
    predicted = response_json.get("prediction")

    if isinstance(predicted, str):
        max_label = max(probabilities, key=probabilities.get)
        if max_label != predicted:
            response_json["warning"] = (
                "Prediction does not match highest probability"
            )

    if isinstance(predicted, int):
        expected = "success" if predicted == 1 else "failure"
        max_label = max(probabilities, key=probabilities.get)
        if expected != max_label:
            response_json["warning"] = (
                "Prediction does not match highest probability"
            )