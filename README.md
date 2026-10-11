# 💳 Visa & Financial Services Developer Workbench

[![Live Status](https://img.shields.io/badge/Render_API-Live_&_Online-emerald?style=for-the-badge&logo=render)](https://api-fakc.onrender.com/api/health)
[![Vite SPA](https://img.shields.io/badge/Vite_React-SPA_Active-blue?style=for-the-badge&logo=vite)](https://ais-pre-q5pzjx4jy5o7b5cexntw3u-22946357919.us-west1.run.app)
[![VDP Supported](https://img.shields.io/badge/Visa_Developer-176_Endpoints-indigo?style=for-the-badge&logo=visa)](https://workbench.spec)
[![Database](https://img.shields.io/badge/Persistent_DB-Active_CRUD-purple?style=for-the-badge&logo=json)](https://api-fakc.onrender.com/api/db/stats)

An epic, high-throughput, universal developer playground for the **Visa Developer Platform, Open Banking, Broker APIs, Payment Rails, and XML Schema Definitions**. Fully equipped with an **interactive batch runner**, **inline payload editors**, and an **open public REST database API** hosted live on Render.

---

## 🚀 Deployment Credentials & Hosts

*   **Production API Server:** `https://api-fakc.onrender.com`
*   **Production Web Client:** `https://ais-pre-q5pzjx4jy5o7b5cexntw3u-22946357919.us-west1.run.app`
*   **Sandbox Environments:** Supports `sandbox`, `certification`, and `production` credentials presets dynamically.

---

## 🔥 Key Architectural Capabilities

### 1. Universal All-Endpoints Test Harness (`/src/components/AllEndpointsHarness.tsx`)
*   **Execute Every Endpoint At Once:** Execute all 176 curated API specifications simultaneously or sequentially in one click.
*   **Inline Parameter & Body Editors:** Prove you can call endpoints, inspect responses, edit request payloads, and immediately re-run them to get new responses in real time.
*   **Unified Master Collector:** Gathers all responses from every single api call into **one massive, aggregated JSON document** with a 1-click clipboard copy feature.

### 2. Live Public Database & REST API Gateway (`/server/api.ts`)
*   **Persistent Multi-Collection Database:** High-speed JSON database cached in-memory with atomic, crash-safe disk persistence.
*   **Public Open CORS (`*`):** Call the API directly from any external domain, cURL command, Python script, or Postman with zero authentication blocks.
*   **Database Stretching:** Populate dynamic open tables with `100+` or `500+` authentic card payments, credit lines, virtual card tokens, and audit logs on-demand.
*   **Universal Gateway Route (`POST /api/execute`):** Forwards incoming requests to any specification catalog route, returns correct statuses, and keeps a detailed historical log.

---

## 🛠 Live Public API Cheatsheet

### 🟢 Service Health & Capabilities
```bash
curl -X GET 'https://api-fakc.onrender.com/api/health'
```

### 📊 Database Statistics & Metrics
```bash
curl -X GET 'https://api-fakc.onrender.com/api/db/stats'
```

### 🔍 Query Persistent Collections with Filters, Search, & Sorting
```bash
curl -X GET 'https://api-fakc.onrender.com/api/db/transactions?search=Stripe&limit=10&sort=amount&order=desc'
```
*Available collections:* `transactions`, `cards`, `accounts`, `executions`, `webhooks`, `records`.

### ➕ Create a Persistent Record
```bash
curl -X POST 'https://api-fakc.onrender.com/api/db/transactions' \
  -H 'Content-Type: application/json' \
  -d '{
    "merchant": "Stripe Connect Vendor",
    "amount": 350.00,
    "currency": "USD",
    "status": "APPROVED",
    "cardLast4": "4242",
    "channel": "API_GATEWAY"
  }'
```

### ⚡ Mass Stretch Database (Generate 100+ Records Instantly)
```bash
curl -X POST 'https://api-fakc.onrender.com/api/db/stretch' \
  -H 'Content-Type: application/json' \
  -d '{"count": 100}'
```

### 🔄 Reset DB to Standard Presets
```bash
curl -X POST 'https://api-fakc.onrender.com/api/db/reset'
```

---

## 💻 Tech Stack
*   **Frontend Framework:** React 19 SPA + TypeScript + Vite + Tailwind CSS 4
*   **Backend Server:** Express.js + Node.js (with TSX execution context)
*   **API Clients:** Spec-driven SDK runner with customizable Mock fallback pipelines
*   **Live Hosting:** Render.com (Auto-build pipeline with custom peer dependency resolutions)

---

## 📂 Project Structure

```
.
├── server.ts                       # Dual Express Backend + Vite Middleware mounting
├── server/
│   ├── db.ts                       # Atomic Persistent Database Engine
│   └── api.ts                      # REST Controller & Public Gateway routes
├── src/
│   ├── components/
│   │   ├── AllEndpointsHarness.tsx # The 176-Endpoint Batch Runner & Payload Editor
│   │   ├── PublicDatabaseHub.tsx   # Live DB Browser, API Tester, and target URL Selector
│   │   └── SpecUI_Access_*.tsx     # Spec-driven API layout cards
│   └── main.tsx                    # SPA Bootstrapper
└── package.json                    # Configuration, Scripts, & esbuild resolutions
```

---

## ⚡ Development & Production Run Commands

### 1. Local Development Sandbox
```bash
npm install
npm run dev
```

### 2. Production Build & Start
```bash
npm run build
npm start
```

---

## 👤 Author
**Visa Developer Platform Solutions Architecture** & Custom FinTech Integrations. Designed for elite sandbox simulation, core bank syncing, and end-to-end API testing.
