
import numpy as np
import pandas as pd
import datetime

# Function to simulate daily glucose levels
def simulate_glucose(num_days, condition, body_index, years, sex):
    bmi_impact = ((body_index - 25) ** 2) * 0.01
    if sex == "Female":
        bmi_impact *= 1.1
    bmi_impact *= 1 + 0.01 * (years - 50)

    thresholds = {"non_diabetic": 140, "pre_diabetic": 170, "diabetic": 200}
    glucose_values = []

    for day in range(num_days):
        if condition == "non_diabetic":
            base_glucose = np.random.normal(70, 8)
        elif condition == "pre_diabetic":
            base_glucose = np.random.normal(110, 18)
        else:
            base_glucose = np.random.normal(135, 22)
        
        base_glucose += bmi_impact
        daily_fluctuation = np.random.normal(0, 5)
        glucose = max(min(base_glucose + daily_fluctuation, thresholds[condition]), 50)
        glucose_mmol = glucose / 18.0
        glucose_values.append(glucose_mmol)

    return np.array(glucose_values)

# Parameters for simulation
num_individuals = 100
period = 90
np.random.seed(42)

# Demographic information
ids = np.arange(1, num_individuals + 1)
years_old = np.random.randint(18, 66, num_individuals)
sexes = np.random.choice(["Female", "Male"], num_individuals)
body_indexes = np.round(np.random.uniform(18.5, 40, num_individuals), 2)

# Create timestamps for daily readings
start_period = datetime.date.today() - datetime.timedelta(days=period)
dates = pd.date_range(start=start_period, periods=period, freq="D")

# Generate synthetic data
records = []
for id_num in ids:
    condition = np.random.choice(["non_diabetic", "pre_diabetic", "diabetic"], p=[0.2, 0.3, 0.5])
    body_index = body_indexes[id_num - 1]
    years = years_old[id_num - 1]
    sex = sexes[id_num - 1]
    daily_glucose = simulate_glucose(period, condition, body_index, years, sex)
    for i in range(period):
        records.append([
            id_num,
            dates[i].strftime("%Y-%m-%d"),
            sex,
            years,
            body_index,
            daily_glucose[i]
        ])

column_titles = ["patient_no", "date", "gender", "age", "bmi", "glucose_level"]
generated_data = pd.DataFrame(records, columns=column_titles)

# Function to calculate estimated HbA1c from average glucose levels
def calculate_hba1c(average_glucose):
    average_glucose_mg_dl = average_glucose * 18  # Convert from mmol/L to mg/dL
    return ((average_glucose_mg_dl + 46.7) / 28.7)

# Calculate average glucose levels per patient
average_glucose = generated_data.groupby('patient_no')['glucose_level'].mean()

# Calculate HbA1c using the provided formula
generated_data['HbA1c'] = calculate_hba1c(average_glucose[generated_data['patient_no']].values)

# Show updated DataFrame with new HbA1c column
generated_data.head(), generated_data['HbA1c'].describe()

# Save the dataframe to a CSV file
generated_data.to_csv(
    "/Users/khandakarhossin/Desktop/Dataset/HbA1c_prediction_dataset.csv", index=False, float_format="%.2f"
)