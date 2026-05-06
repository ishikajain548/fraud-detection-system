import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_bank_transactions(n=200000, fraud_rate=0.02):
    np.random.seed(42)

    start = datetime(2023, 1, 1)

    df = pd.DataFrame({
        "tx_id": [f"TXN-{i}" for i in range(n)],
        "ts": [start + timedelta(minutes=np.random.randint(0, 60*24*30)) for _ in range(n)],
        "type": np.random.choice(["TRANSFER", "CASH_OUT", "DEPOSIT", "PAYMENT"], n, p=[0.4,0.3,0.2,0.1]),
        "amount": np.round(np.random.lognormal(mean=10, sigma=1, size=n), 2),
        "oldbalanceOrg": np.random.uniform(10000, 500000, n),
        "oldbalanceDest": np.random.uniform(0, 200000, n),
    })

    df["newbalanceOrig"] = df["oldbalanceOrg"] - df["amount"]
    df["newbalanceDest"] = df["oldbalanceDest"] + df["amount"]

    # -------- Fraud labeling (vectorized) --------
    fraud_mask = np.random.rand(n) < fraud_rate
    df["isFraud"] = fraud_mask.astype(int)

    # Strong fraud pattern: account wipe / near wipe
    df.loc[fraud_mask, "amount"] = df.loc[fraud_mask, "oldbalanceOrg"] * np.random.uniform(0.7, 1.0, fraud_mask.sum())
    df.loc[fraud_mask, "newbalanceOrig"] = 0
    df.loc[fraud_mask, "type"] = np.random.choice(["TRANSFER", "CASH_OUT"], fraud_mask.sum())

    # -------- Feature Engineering --------
    df["balance_diff"] = df["oldbalanceOrg"] - df["newbalanceOrig"]
    df["is_zero_balance"] = (df["newbalanceOrig"] == 0).astype(int)
    df["amount_to_balance_ratio"] = df["amount"] / (df["oldbalanceOrg"] + 1)
    df["is_large_txn"] = (df["amount"] > 200000).astype(int)
    df["dest_balance_change"] = df["newbalanceDest"] - df["oldbalanceDest"]

    return df