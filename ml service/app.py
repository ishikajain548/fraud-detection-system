from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import shap
import numpy as np

from rules import apply_rules

app = FastAPI()

model = joblib.load("model.pkl")

explainer = shap.TreeExplainer(model)

class Transaction(BaseModel):
    amount: float
    type: str
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float


@app.post("/predict")
def predict(txn: Transaction):
    data = txn.dict()

    # -------- Feature Engineering (same as training) --------
    data["balance_diff"] = data["oldbalanceOrg"] - data["newbalanceOrig"]
    data["is_zero_balance"] = int(data["newbalanceOrig"] == 0)
    data["amount_to_balance_ratio"] = data["amount"] / (data["oldbalanceOrg"] + 1)
    data["is_large_txn"] = int(data["amount"] > 200000)
    data["dest_balance_change"] = data["newbalanceDest"] - data["oldbalanceDest"]

    features = np.array([[
        data["amount"],
        data["oldbalanceOrg"],
        data["newbalanceOrig"],
        data["oldbalanceDest"],
        data["newbalanceDest"],
        data["balance_diff"],
        data["is_zero_balance"],
        data["amount_to_balance_ratio"],
        data["is_large_txn"],
        data["dest_balance_change"]
    ]])

    ml_prob = model.predict_proba(features)[0][1]

    # Rule engine
    rule_score, reasons = apply_rules(data)

    final_score = 0.7 * ml_prob + 0.3 * rule_score

    if rule_score >= 0.8:
      final_score += 0.1

    final_score = min(final_score, 1.0)

    if final_score > 0.75:
      decision = "BLOCK"
    elif final_score > 0.4:
      decision = "REVIEW"
    else:
      decision = "ALLOW"

    return {
        "ml_score": round(float(ml_prob), 4),
        "rule_score": round(float(rule_score), 4),
        "final_score": round(float(final_score), 4),
        "fraud": bool(final_score > 0.5),
        "decision": decision,
        "reasons": reasons
    }

@app.post("/explain")
def explain(txn: Transaction):
    data = txn.dict()

    # Feature engineering
    data["balance_diff"] = data["oldbalanceOrg"] - data["newbalanceOrig"]
    data["is_zero_balance"] = int(data["newbalanceOrig"] == 0)
    data["amount_to_balance_ratio"] = data["amount"] / (data["oldbalanceOrg"] + 1)
    data["is_large_txn"] = int(data["amount"] > 200000)
    data["dest_balance_change"] = data["newbalanceDest"] - data["oldbalanceDest"]

    features = np.array([[ 
        data["amount"],
        data["oldbalanceOrg"],
        data["newbalanceOrig"],
        data["oldbalanceDest"],
        data["newbalanceDest"],
        data["balance_diff"],
        data["is_zero_balance"],
        data["amount_to_balance_ratio"],
        data["is_large_txn"],
        data["dest_balance_change"]
    ]])

    ml_prob = model.predict_proba(features)[0][1]
    rule_score, reasons = apply_rules(data)

    if rule_score >= 0.8:
        final_score = 1.0
        decision = "BLOCK"
    else:
        final_score = max(ml_prob, rule_score)
        decision = "REVIEW" if final_score > 0.5 else "ALLOW"

    # SHAP
    shap_values = explainer.shap_values(features)

    if isinstance(shap_values, list):
        shap_values = shap_values[1]

    feature_names = [
        "amount",
        "oldbalanceOrg",
        "newbalanceOrig",
        "oldbalanceDest",
        "newbalanceDest",
        "balance_diff",
        "is_zero_balance",
        "amount_to_balance_ratio",
        "is_large_txn",
        "dest_balance_change"
    ]

    shap_dict = {
        feature_names[i]: float(shap_values[0][i])
        for i in range(len(feature_names))
    }

    base_value = explainer.expected_value
    if isinstance(base_value, list):
        base_value = base_value[1]

    return {
        "ml_score": round(float(ml_prob), 4),
        "rule_score": round(float(rule_score), 4),
        "final_score": round(float(final_score), 4),
        "fraud": bool(final_score > 0.5),
        "decision": decision,
        "reasons": reasons,

        # 👇 UI friendly
        "explanations": shap_dict,
        "shap_values": shap_values[0].tolist(),
        "feature_names": feature_names,
        "base_value": float(base_value)
    }