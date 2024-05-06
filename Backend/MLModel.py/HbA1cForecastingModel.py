import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import mean_squared_error, r2_score,mean_absolute_error, explained_variance_score

# Load data
data = pd.read_csv('../../AIBetic2Dataset/HbA1c_prediction_dataset.csv')

# Drop patient_no column if it exists
if 'patient_no' in data.columns:
    data = data.drop('patient_no', axis=1)

# Drop rows with missing values    
data = data.ffill().dropna()

# Print head of the data
print(data.head())

# Create separate scalers for each feature
scaler_glucose = MinMaxScaler()
data['glucose_level'] = scaler_glucose.fit_transform(data[['glucose_level']])


# Save the glucose scaler for predictions
with open('glucose_scaler.pkl', 'wb') as f:
    pickle.dump(scaler_glucose, f)



# Constants for the model
SEQUENCE_LENGTH = 20  # Number of glucose readings in each sequence

# Function to create sequences
def create_sequences(data, seq_length):
    xs = []
    ys = []
    for i in range(len(data) - seq_length):
        end_ix = i + seq_length
        if end_ix > len(data):
            break
        x_seq = data['glucose_level'].iloc[i:end_ix].values
        y_seq = data['HbA1c'].iloc[end_ix]
        xs.append(x_seq)
        ys.append(y_seq)
    return np.array(xs), np.array(ys)

# Prepare sequences
X_all, y_all = create_sequences(data, SEQUENCE_LENGTH)

# Reshape input to be [samples, time steps, features]
X_all = X_all.reshape((X_all.shape[0], SEQUENCE_LENGTH, 1))  # Only one feature, glucose levels

# Splitting data into training, validation, and testing sets
X_train, X_temp, y_train, y_temp = train_test_split(X_all, y_all, test_size=0.2, random_state=0)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.2, random_state=0)

# Define a simpler LSTM model
model = Sequential([
    LSTM(20, activation='relu', input_shape=(SEQUENCE_LENGTH, 1)), # 20 units in the LSTM layer
    Dense(1)
])

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.01), loss='mean_squared_error')

# Train the model with validation data
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_data=(X_val, y_val),
    verbose=1
)

# Plot training & validation loss to check for overfitting
plt.figure(figsize=(10, 5))
plt.plot(history.history['loss'], label='Training loss')
plt.plot(history.history['val_loss'], label='Validation loss')
plt.title('Training and Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()

# Evaluate the model on the test set
test_loss = model.evaluate(X_test, y_test)
print("Test loss:", test_loss)

# Predict using the trained model
predictions = model.predict(X_test)
# Calculate metrics
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
evs = explained_variance_score(y_test, predictions)

print(f'MSE: {mse}')
print(f'RMSE: {rmse}')
print(f'MAE: {mae}')
print(f'R2: {r2}')
print(f'EVS: {evs}')
# Save the trained model
model.save('A1c_model.h5')
