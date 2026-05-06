import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import joblib

from generator import generate_bank_transactions

df = generate_bank_transactions()

features = [
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

X = df[features]
y = df["isFraud"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = XGBClassifier(
    n_estimators=80,
    max_depth=5,
    scale_pos_weight=5,  
    tree_method="hist"
)

model.fit(X_train, y_train)

print("Model trained")

joblib.dump(model, "model.pkl")