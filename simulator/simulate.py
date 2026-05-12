from kafka import KafkaProducer
import json
import time
import random

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v:
        json.dumps(v).encode('utf-8')
)

types = [
    "TRANSFER",
    "CASH_OUT",
    "DEPOSIT",
    "PAYMENT"
]

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

    producer.send("transactions-topic", txn)

    print("Sent:", txn)

    time.sleep(random.uniform(0.5, 2))