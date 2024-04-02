import numpy as np
import pandas as pd

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split

import pickle

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import os

# Get the directory path of the current file
dir_path = os.path.dirname(os.path.realpath(__file__))

# Change the working directory to the current file's directory
os.chdir(dir_path)

# Load dataset
dataFrame = pd.read_csv("../../AIBetic2Dataset/balanced_diabetes_data.csv")

columns_to_convert = ['delayed healing', 'Polyuria', 'Alopecia', 'Gender', 'Itching', 'visual blurring', 'weakness', 'partial paresis', 'Polydipsia', 'Age', 'Polyphagia', 'sudden weight loss', 'Irritability']

for column in columns_to_convert:
    dataFrame[column] = dataFrame[column].replace({'Yes': 1, 'No': 0})
dataFrame['Gender'] = dataFrame['Gender'].replace({'Male': 1, 'Female': 0})
dataFrame['class'] = dataFrame['class'].replace({'Positive': 1, 'Negative': 0})


# print(dataFrame.head())


selected_columns = ['Age', 'Gender', 'Polyuria', 'Polydipsia', 'sudden weight loss', 'weakness', 'Polyphagia', 'Itching', 'Irritability', 'delayed healing', 'partial paresis', 'Alopecia','visual blurring', 'class']




# Keep only the columns in selected_columns
dataFrame = dataFrame[selected_columns]

# Rename the columns to lowercase
dataFrame.columns = map(str.lower, dataFrame.columns)

x = dataFrame.drop("class", axis=1)
y = dataFrame["class"]


print(x.head())
#min max scaler
scaler = MinMaxScaler()
x[['age']] = scaler.fit_transform(x[['age']]) # Scale the Age column

print(x.head())


# Split the data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# Train a Random Forest model
model = RandomForestClassifier(random_state=42)
model.fit(x_train, y_train)

# Make predictions
y_pred = model.predict(x_test)

# Calculate evaluation metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.2f}")
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1 Score: {f1:.2f}")



# Save the model
with open('model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

# Save the scaler
with open('scaler.pkl', 'wb') as scaler_file:
    pickle.dump(scaler, scaler_file)

print("Model training complete. Model and scaler have been saved.")







