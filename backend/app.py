from flask import Flask, request, jsonify
import pickle
import numpy as np
import sqlite3

app = Flask(__name__)

# Load the ML model
model = pickle.load(open('cardio_model.pkl', 'rb'))

# Database setup
def init_db():
    conn = sqlite3.connect('predictions.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY, age INT, gender INT, systolic_bp INT, diastolic_bp INT, cholesterol INT, glucose INT, smoker INT, alcoholic INT, active INT, risk TEXT)''')
    conn.commit()
    conn.close()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = [
            int(data['age']), int(data['gender']), int(data['systolic_bp']), 
            int(data['diastolic_bp']), int(data['cholesterol']), int(data['glucose']), 
            int(data['smoker']), int(data['alcoholic']), int(data['active'])
        ]
        prediction = model.predict([features])
        risk = 'High' if prediction[0] == 1 else 'Low'

        # Save to DB
        conn = sqlite3.connect('predictions.db')
        cursor = conn.cursor()
        cursor.execute('''INSERT INTO results (age, gender, systolic_bp, diastolic_bp, cholesterol, glucose, smoker, alcoholic, active, risk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (*features, risk))
        conn.commit()
        conn.close()

        return jsonify({'risk': risk})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/history', methods=['GET'])
def history():
    conn = sqlite3.connect('predictions.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM results')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)