from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)


print(np.__version__)


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







