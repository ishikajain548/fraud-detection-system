# Smart Fraud Detection System

A **real-time, explainable fraud detection platform** built using a distributed architecture that combines **Machine Learning, Rule-Based Intelligence, and SHAP Explicability** to detect and analyze fraudulent financial transactions instantly.

The system simulates live banking transactions, evaluates risk in real time, and provides **transparent AI-driven explanations** for every fraud decision.

---

## Key Features

### Real-Time Fraud Detection

- Live transaction stream using **WebSocket (STOMP)**
- Instant fraud scoring and decisioning (`ALLOW | REVIEW | BLOCK`)
- Continuous monitoring dashboard

---

### Hybrid Intelligence Engine

Combines:

- Machine Learning model (probabilistic fraud scoring)
- Rule-based fraud detection engine
- Fusion logic for final decision making

> Ensures both statistical learning and domain logic are used together for higher accuracy.

---

### Explainable AI (XAI) with SHAP

- Feature-level explanation for every prediction
- Shows **impact of each transaction attribute**
- Helps understand *why a transaction was flagged*

Example insights:

- High transaction amount
- Balance anomaly
- Suspicious transfer pattern

---

### Live Fraud Monitoring Dashboard

Built with React, featuring:

- Live transaction feed
- Risk trend visualization
- Fraud summary insights
- Rule trigger breakdown
- Drill-down investigation mode (SHAP analysis)

---

### Smart Investigation System

Instead of manual selection, users can inspect:

- Highest Risk Transaction
- Latest Fraud Case
- Random Sample Review

Each triggers:

- Transaction selection
- ML + Rule explanation
- SHAP-based feature attribution

---

## System Architecture

Transaction Simulator (Python)

             ↓

Spring Boot Backend (REST API)

             ↓

FastAPI ML Service

             ↓

┌────────────────────────────┐

│  ML Model (Fraud Score)            │

│  Rule Engine (Risk Logic)          │

│  Fusion Layer                      │

│  SHAP Explainer                    │

└────────────────────────────┘

             ↓

       Fraud Decision 

             ↓
 
    WebSocket Stream (STOMP)

             ↓

React Dashboard (Live Monitoring + SHAP)


---

## Tech Stack

### Backend

- Java Spring Boot
- Spring WebSocket (STOMP)
- REST APIs

### ML Service

- Python FastAPI
- Scikit-learn / XGBoost (model)
- SHAP (Explainable AI)
- NumPy / Pandas

### Frontend

- React.js
- Tailwind CSS
- Recharts (visualization)
- SockJS + STOMP client

### Simulation Engine

- Python transaction generator
- Realistic fraud pattern simulation
- Burst + anomaly-based data generation

---

## Fraud Detection Logic

### ML Model

Predicts fraud probability using transaction features:

- Amount
- Balance changes
- Transaction type
- Engineered financial features

---

### Rule Engine

Enhances detection using domain logic:

- High transaction amount threshold
- Balance anomaly detection
- Suspicious transfer patterns
- Rapid account draining behavior

---

### Fusion Strategy

If rule score >= threshold → BLOCK
Else → max(ML score, rule score)
Decision → ALLOW | REVIEW | BLOCK

## Feature Engineering

The model is enhanced with engineered features:

- Balance difference
- Account drain detection
- Zero balance indicator
- Amount-to-balance ratio
- Destination balance changes

---

## Fraud Simulation Engine

A custom generator creates realistic transaction streams:

- Normal + fraudulent behavior mix
- Burst transaction patterns
- Randomized financial behavior
- Real-time streaming simulation

---

## Project Demo

![Smart fraud detection System](screenshots/Smart_Fraud_Detection_System.gif)

---

## Key Highlights

- Real-time distributed system design
- Hybrid AI + rule-based decision system
- Explainable AI (SHAP integration)
- Production-style fraud monitoring UI
- Event-driven architecture
- Live transaction simulation engine

---

## What Makes This Project Unique

Unlike typical ML projects, this system:

- Works in **real-time streaming mode**
- Explains prediction (XAI layer)
- Uses **hybrid intelligence (ML + Rules)**
- Simulates **real banking fraud scenarios**
- Provides **investigation-ready dashboard UI**

---

## Future Enhancements

- User behavior profiling system
- Graph-based fraud detection (transaction networks)
- Real-time alerting system (email/SMS)
- Persistent fraud case management
- Advanced anomaly detection models

---

## Author

Built as a **full-stack AI system project** demonstrating:

- Machine Learning engineering
- Backend system design
- Real-time architecture
- Explainable AI integration