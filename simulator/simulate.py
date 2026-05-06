import time
import random
import requests

URL = "http://localhost:8080/api/transactions"

types = ["TRANSFER", "CASH_OUT", "DEPOSIT", "PAYMENT"]

def generate_txn():
    amount = random.randint(1000, 1000000)
    oldbalance = random.randint(10000, 500000)

    old_dest = random.randint(0, 300000)


    return {
        "type": random.choice(types),
        "amount": amount,
        "oldbalanceOrg": oldbalance,
        "newbalanceOrig": max(0, oldbalance - amount),
        "oldbalanceDest": old_dest,
        "newbalanceDest": old_dest + amount
    }

while True:
    txn = generate_txn()

    try:
        res = requests.post(URL, json=txn)
        print(res.json())
    except Exception as e:
        print("Error:", e)

    time.sleep(random.uniform(0.5, 2))  # realistic delay