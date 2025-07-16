# 🫀 CardioPredict – Cardiovascular Disease Risk Prediction System

An AI-powered web application that predicts the risk of cardiovascular disease using patient health metrics. Built using Python, Flask, and machine learning models, the system analyzes real-world health data to generate real-time risk assessments.

## 🚀 Features

- Predicts heart disease risk using patient input data  
- Trained on real-world datasets with high accuracy (>85%)  
- REST API deployment using Flask for easy integration  
- Interactive, responsive web interface for user input  
- Implements multiple ML models: Decision Tree, Logistic Regression, K-Nearest Neighbors (KNN)

## 🛠️ Tech Stack

- **Backend**: Python, Flask, SQLAlchemy  
- **Machine Learning**: Scikit-learn, Pandas, NumPy  
- **Frontend**: HTML, CSS, JavaScript (basic UI)  
- **Database**: SQLite / PostgreSQL (optional)  
- **APIs**: RESTful endpoints for prediction and results

## 📊 Dataset & Preprocessing

- Uses a public cardiovascular dataset (e.g., UCI Heart Disease)  
- Data preprocessing includes:
  - Handling missing values  
  - Outlier detection and removal  
  - Feature selection and normalization

## 🧠 Machine Learning

- Implemented and compared multiple models:
  - Logistic Regression  
  - Decision Tree Classifier  
  - K-Nearest Neighbors (KNN)  
- Final model selected based on performance metrics (Accuracy, F1 Score)

## 🖥️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/CardioPredict.git
cd CardioPredict

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
