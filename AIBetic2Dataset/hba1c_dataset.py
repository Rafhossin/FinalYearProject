import numpy as np
import pandas as pd
import datetime

class Patient:
    def __init__(self, patient_id, age, sex, bmi, condition):
        self.patient_id = patient_id
        self.age = age
        self.sex = sex
        self.bmi = bmi
        self.condition = condition
        self.daily_glucose_levels = []

    def simulate_daily_glucose(self, num_days):
        # Base glucose levels in mmol/L for different conditions
        base_values = {'non_diabetic': 70 / 18, 'pre_diabetic': 110 / 18, 'diabetic': 135 / 18}
        std_devs = {'non_diabetic': 8 / 18, 'pre_diabetic': 18 / 18, 'diabetic': 22 / 18}
        
       

        for _ in range(num_days):
            base_glucose = np.random.normal(base_values[self.condition], std_devs[self.condition])
            daily_fluctuation = np.random.normal(0, 5) / 18
            glucose = max(min(base_glucose + daily_fluctuation, 200 / 18), 50 / 18)
            self.daily_glucose_levels.append(glucose)

def generate_patients(num_individuals):
    ids = np.arange(1, num_individuals + 1)
    ages = np.random.randint(18, 66, num_individuals)
    sexes = np.random.choice(["Female", "Male"], num_individuals)
    bmis = np.round(np.random.uniform(18.5, 40, num_individuals), 2)
    conditions = np.random.choice(["non_diabetic", "pre_diabetic", "diabetic"], num_individuals, p=[0.3, 0.3, 0.4])
    return [Patient(id_num, age, sex, bmi, condition) for id_num, age, sex, bmi, condition in zip(ids, ages, sexes, bmis, conditions)]

def generate_data_frame(patients, start_date, num_days):
    records = []
    for patient in patients:
        patient.simulate_daily_glucose(num_days)
        dates = pd.date_range(start=start_date, periods=num_days, freq="D")
        for date, glucose_level in zip(dates, patient.daily_glucose_levels):
            records.append([
                patient.patient_id,
                date.strftime("%Y-%m-%d"),
                patient.sex,
                patient.age,
                patient.bmi,
                glucose_level
            ])
    return pd.DataFrame(records, columns=["patient_no", "date", "gender", "age", "bmi", "glucose_level"])

def calculate_hba1c(average_glucose):
    # Using the established conversion for average glucose in mmol/L to HbA1c
    return (average_glucose + 2.15) * 1.59 - 2.59

# Main execution
np.random.seed(42)
num_individuals = 100
num_days = 90
start_date = datetime.date.today() - datetime.timedelta(days=num_days)
patients = generate_patients(num_individuals)
generated_data = generate_data_frame(patients, start_date, num_days)

# Calculate average glucose levels per patient and HbA1c
average_glucose = generated_data.groupby('patient_no')['glucose_level'].mean()
generated_data['HbA1c'] = calculate_hba1c(average_glucose[generated_data['patient_no']].values)

# Display and save
print(generated_data.head())
print(generated_data['HbA1c'].describe())
generated_data.to_csv("HbA1c_prediction_dataset.csv", index=False, float_format="%.2f")
