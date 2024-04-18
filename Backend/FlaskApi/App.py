from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import pickle

app = Flask(__name__)
CORS(app)


# Load the glucose scaler
with open('glucose_scaler.pkl', 'rb') as f:
    scaler_glucose = pickle.load(f)

# Load the HbA1c model
model_hba1c = load_model('A1c_model.h5')

@app.route("/predict-hba1c", methods=["POST"])
def predict_hba1c():
    try:
        data = request.get_json(force=True)
        glucose_readings = data['readings']
        
        if len(glucose_readings) != 20:
            return jsonify({"error": "Exactly 20 glucose readings are required."}), 400
        
        glucose_array = np.array(glucose_readings).reshape(-1, 1)  # Correct reshaping before scaling
        glucose_array = scaler_glucose.transform(glucose_array)  # Scaling
        glucose_array = glucose_array.reshape(1, 20, 1)  # Reshape for LSTM

        prediction = model_hba1c.predict(glucose_array)
        predicted_hba1c = prediction.flatten()[0]

        

        return jsonify({"predicted_hba1c": round(float(predicted_hba1c), 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Load the model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

with open("scaler.pkl", "rb") as file:
    scaler = pickle.load(file)

@app.route("/predict", methods=["POST"])



def predict():
    # Get data from the request
    data = request.get_json(force=True)

    # Print the DataFrame
    print(data)


    # Define the feature order that the model expects
    feature_order = ['age', 'gender', 'polyuria', 'polydipsia', 'sudden weight loss', 'weakness', 'polyphagia', 'itching', 'irritability', 'delayed healing', 'partial paresis', 'alopecia', 'visual blurring']

    # Create a DataFrame with the correct feature order
    data = pd.DataFrame(data, index=[0])[feature_order]

    print(data)

    # Preprocess the data
    data.columns = map(str.lower, data.columns)

    data[['age']] = scaler.transform(data[['age']])

    # Make prediction
    prediction = model.predict(data)

    # Return the prediction
    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    app.run(port=5000, debug=True)







