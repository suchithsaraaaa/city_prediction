# City Growth Insights & Prediction AI 🌍

**A Next-Generation Urban Analytics Platform**

Empowering urban planners, developers, and researchers with data-driven insights, machine learning predictions, and real-time economic intelligence. This platform aggregates global city data to forecast urban growth trends for 2025-2030.

![City Growth Dashboard](https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop)

## 🚀 Key Features

*   **Global Dataset**: Comprehensive data on **100+ major cities** across North America, Europe, Asia, and Oceania.
*   **Predictive AI Model**: Uses **Random Forest Regression** & **Stochastic Gradient Boosting** to forecast a "Growth Score" based on GDP, crime rates, infrastructure, and more.
*   **Realtime Intelligence**: Integrated **News Ticker** fetching live updates on Urban Development and Economy via Google News RSS.
*   **Smart Filtering**: Country-specific data isolation ensures you only see relevant stats for the selected region (USA, UK, India, etc.).
*   **Advanced Visualization**: Interactive **Recharts** (Bar, Line, Scatter) for deep analysis of GDP vs. Growth correlations and traffic density.

## 🛠️ Technology Stack

### Backend (API & Intelligence)
*   **Framework**: Django REST Framework (Python 3.10+)
*   **Database**: SQLite / PostgreSQL
*   **ML Engine**: Scikit-Learn (Random Forest), Pandas, NumPy
*   **Data Sources**: Wikipedia (Scraping), Google News (RSS w/ feedparser)

### Frontend (User Experience)
*   **Library**: React 18 (Vite + TypeScript)
*   **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
*   **State Management**: TanStack Query
*   **Visualization**: Recharts (SVG-based vector graphics)

## 📦 Installation Guide

### Prerequisites
*   Python 3.10+
*   Node.js 18+ & npm

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
*The API will start at `http://127.0.0.1:8000/`*

### 2. Frontend Setup
```bash
cd city-growth-insights-main
npm install
npm run dev
```
*The App will handle at `http://localhost:8080/` (or similar)*

## 🧠 Machine Learning Methodology

Our growth prediction engine processes historical data (2015-2024) through a pipeline of:
1.  **Normalization**: Adjusting GDP (PPP) and Crime Indices for cross-border comparison.
2.  **Ensemble Learning**: Training 500 decision trees to detect non-linear correlations between infrastructure spending and population influx.
3.  **Scoring**: Generating a normalized 0-10 "Growth Score" for future potential.

## 👥 Credits

**Development Team**
*   **Suchith Sara** - Lead Developer
*   **Sai Krishna** - Contributor

---
*Built with ❤️ for the future of Urban Planning.*
