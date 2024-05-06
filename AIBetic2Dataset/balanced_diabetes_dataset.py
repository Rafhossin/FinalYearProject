import pandas as pd
import numpy as np
import os

def load_data(file_path):
    return pd.read_csv(file_path)

def get_counts(dataframe):
    return dataframe.groupby(["Gender", "class"]).size().reset_index(name="counts")

def generate_counts():
    np.random.seed(0)  # for reproducibility
    total_count = np.random.randint(900, 1150)  # random total target count
    return np.random.multinomial(total_count, [0.24, 0.26, 0.26, 0.24])  # random split among groups

def calculate_differences(current_counts, target_counts):
    differences = {}
    for i, (gender, diabetes_class) in enumerate(
        [
            ("Male", "Positive"),
            ("Male", "Negative"),
            ("Female", "Positive"),
            ("Female", "Negative"),
        ]
    ):
        current_count = current_counts[
            (current_counts["Gender"] == gender)
            & (current_counts["class"] == diabetes_class)
        ]["counts"].sum()
        difference = max(0, target_counts[i] - current_count)
        differences[(gender, diabetes_class)] = difference
    return differences

def generate_data(dataframe, differences):
    dataframes = []
    for (gender, diabetes_class), difference in differences.items():
        if difference > 0:
            dataframe_new = generate_data_for_class(dataframe, gender, diabetes_class, difference)
            dataframes.append(dataframe_new)
    return dataframes

def generate_data_for_class(dataframe, gender, diabetes_class, num_records):
    dataframe_new = pd.DataFrame()
    for column in dataframe.columns:
        if column in ["Gender", "class"]:  # These will be set explicitly later
            continue
        if dataframe[column].dtype == np.number:
            mean, std = (
                dataframe[dataframe["class"] == diabetes_class][column].mean(),
                dataframe[dataframe["class"] == diabetes_class][column].std(),
            )
            dataframe_new[column] = np.random.normal(mean, std, num_records)
        else:
            # For categorical columns, replicate the distribution seen in the specific class
            values, counts = np.unique(
                dataframe[dataframe["class"] == diabetes_class][column], return_counts=True
            )
            probs = counts / counts.sum()
            dataframe_new[column] = np.random.choice(values, p=probs, size=num_records)
    dataframe_new["Gender"] = gender
    dataframe_new["class"] = diabetes_class
    return dataframe_new

def save_data(dataframe, dataframes, file_path):
    if dataframes:
        data = pd.concat(dataframes, ignore_index=True)
        dataframe_balanced = pd.concat([dataframe, data], ignore_index=True)
    else:
        dataframe_balanced = dataframe.copy()

    dataframe_balanced.to_csv(file_path, index=False)

def main():
    path = os.path.dirname(os.path.realpath(__file__))
    os.chdir(path)

    dataframe = load_data("diabetes_data_upload.csv")
    current_counts = get_counts(dataframe)
    target_counts = generate_counts()
    differences = calculate_differences(current_counts, target_counts)
    dataframes = generate_data(dataframe, differences)
    save_data(dataframe, dataframes, "v2_diabetes_data.csv")

    print("Dataset balancing complete. The balanced dataset has been saved.")

if __name__ == "__main__":
    main()