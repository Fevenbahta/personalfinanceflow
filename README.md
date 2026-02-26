# 💰 FinanceFlow --- AI-Powered Personal Finance Platform

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Deployment](https://img.shields.io/badge/Deployed-Netlify%20%2B%20Render-success)

> Enterprise-grade full-stack financial management system with AI-driven
> insights, intelligent budgeting, and advanced financial analytics.

------------------------------------------------------------------------

# 🌐 Live Deployment

  Layer         URL
  ------------- -----------------------------------------------
  Frontend      https://personalfinanceflow.netlify.app/login
  Backend API   https://financeflowapi.onrender.com

------------------------------------------------------------------------

# 📌 Executive Summary

FinanceFlow is a production-ready personal finance platform built using:

-   React + Vite (Frontend SPA)
-   Node.js + Express (TypeScript backend)
-   PostgreSQL database
-   Prisma ORM
-   JWT Authentication
-   Docker containerization

The platform enables:

-   Account management
-   Income & expense tracking
-   Budget allocation
-   Goal tracking
-   AI-powered financial insights
-   Spending pattern analytics
-   Smart purchase affordability checks

------------------------------------------------------------------------

# 🏗 System Architecture

## High-Level Architecture

                    ┌────────────────────────────┐
                    │        React + Vite        │
                    │        (Frontend SPA)      │
                    └─────────────┬──────────────┘
                                  │ REST API (JWT)
                                  ▼
                    ┌────────────────────────────┐
                    │    Node.js + Express API   │
                    │     Modular Architecture   │
                    └─────────────┬──────────────┘
                                  │ Prisma ORM
                                  ▼
                    ┌────────────────────────────┐
                    │        PostgreSQL          │
                    │      Relational DB         │
                    └────────────────────────────┘

------------------------------------------------------------------------

# 📡 API Structure

## Users

  Method   Endpoint           Description
  -------- ------------------ ------------------
  POST     /api/users         Register user
  POST     /api/users/login   Login user
  GET      /api/users/:id     Get user profile

## Accounts

  Method   Endpoint        Description
  -------- --------------- ----------------
  POST     /api/accounts   Create account
  GET      /api/accounts   Get accounts

## Transactions

  Method   Endpoint                Description
  -------- ----------------------- --------------------
  POST     /api/transactions       Create transaction
  GET      /api/transactions       Get transactions
  PUT      /api/transactions/:id   Update transaction
  DELETE   /api/transactions/:id   Delete transaction

## Budgets

  Method   Endpoint
  -------- -----------------------------
  POST     /api/budgets
  GET      /api/budgets
  PUT      /api/budgets/:id
  DELETE   /api/budgets/:id
  GET      /api/budgets/analyze
  POST     /api/budgets/check-purchase

## Goals

  Method   Endpoint
  -------- ----------------
  POST     /api/goals
  GET      /api/goals
  PUT      /api/goals/:id
  DELETE   /api/goals/:id

## AI Insights

  Method   Endpoint
  -------- -----------------
  GET      /api/ai/analyze

------------------------------------------------------------------------

# 🗄 Database Overview

Core Models:

-   User
-   Account
-   Transaction
-   BudgetAllocation
-   MonthlyBudget
-   Goal
-   Notification
-   AIInsight
-   SpendingPattern

------------------------------------------------------------------------

# 🐳 Docker Setup

Backend and PostgreSQL are containerized using Docker Compose.

Run:

``` bash
docker-compose up --build
```

------------------------------------------------------------------------

# ⚙ Environment Variables

## Frontend (.env)

    VITE_API_URL=https://financeflowapi.onrender.com/api

## Backend (.env)

    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/financeflow
    PORT=3000
    JWT_SECRET=financeflow_secret_key

------------------------------------------------------------------------

# 🚀 Local Development

## Backend

``` bash
npm install
npx prisma generate
npx prisma migrate dev
npm run build
node dist/server.js
```

## Frontend

``` bash
npm install
npm run dev
```

------------------------------------------------------------------------

# 🔐 Security

-   JWT-based authentication
-   Prisma ORM type-safe queries
-   Environment variable isolation
-   Centralized error handling
-   Cascading relational integrity

------------------------------------------------------------------------

#  📈 Scalability Considerations

 -  Modular service architecture
 -  AI abstraction layer
 -  Easily extendable domain modules
 -  Ready for microservices extraction
 -  Database schema optimized for analytics

# 🎯 Why This Project 

 -  Clear domain separation
 -  AI integration into financial workflows
 -  Strong relational schema modeling
 -  Secure authentication design
 -  Production deployment setup
 -  Dockerized environment
 -  Real-world financial logic

------------------------------------------------------------------------
# 👩‍💻 Author

Feven Bahta\
Full-Stack Developer \| AI-Driven Financial Systems
