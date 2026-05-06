def apply_rules(txn):
    risk = 0
    reasons = []

    if txn["amount"] > 0.8 * txn["oldbalanceOrg"]:
        risk += 0.2
        reasons.append("high_relative_amount")

    if txn["oldbalanceOrg"] > 0 and txn["newbalanceOrig"] == 0:
        risk += 0.3
        reasons.append("balance_anomaly")

    if txn["amount"] > 0.9 * txn["oldbalanceOrg"]:
        risk += 0.3
        reasons.append("account_drain")

    if txn["type"] in ["TRANSFER", "CASH_OUT"] and txn["amount"] > 150000:
        risk += 0.2
        reasons.append("suspicious_outflow")


    return min(risk, 1.0), reasons