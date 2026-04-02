from flask import Flask, request, jsonify
import pandas as pd
import pickle
from preprocess import clean_data

app = Flask(__name__)

# Load model on startup
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not found. Please train first.'}), 500
    
    try:
        data = request.json
        # Format expects list of dicts: [{'sales_import_tonnes': X, 'population_millions': Y}]
        df = pd.DataFrame(data)
        df_clean = clean_data(df)
        
        features = df_clean[['sales_import_tonnes', 'population_millions']]
        predictions = model.predict(features)
        
        return jsonify({'predictions': predictions.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
