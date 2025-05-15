# 🖥️ Microservice Project – Frontend (UI)

This is the **frontend UI** for a microservice-based web application. It connects with two backend services to deliver a seamless experience to users.

---

## 📌 Overview

The system is built with a **microservice architecture**, separating responsibilities between the frontend, AI logic, and standard web functions.

### 🧩 Microservice Architecture

![System Diagram](.readme_assets/solution.png)
> _Image: Diagram of how the UI interacts with the Flask AI backend and the regular JS backend._  
> *(Make sure to place your diagram in the `docs/` folder or update the path.)*

---

## 🔗 Connected Services

### 1. [Flask Backend for AI Handling](https://github.com/AvryG99/EHR_AGENT_PY)
Handles all AI-related logic, such as inference and data processing powered by machine learning models.

### 2. [JavaScript Backend for Web Features](https://github.com/AvryG99/EHR_Agent_JS)
Responsible for regular backend features like user authentication, database management, and other API services.

---

## 🚀 Running the UI

```bash
# Install dependencies
npm install

# Start the frontend
npm start
