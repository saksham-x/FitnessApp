import sys
import json
import ast 

import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression

# input = ast.literal_eval(sys.argv[1])
input = json.loads(sys.stdin.read())

#Load dataset
df = pd.read_csv('dataset.csv')

#Encoding categorical columns
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
categorical_cols = df.select_dtypes('object').columns.tolist()
encoder.fit(df[categorical_cols])
encoded_cols = list(encoder.get_feature_names_out(categorical_cols))
df[encoded_cols] = encoder.transform(df[categorical_cols].fillna('N/A'))

#Initialize and train model
model = LinearRegression()

#Create inputs and targets
inputs, targets = df[['Gender','Age', 'Height', 'Weight', 'Bmi', 'Injury', 'Bmi_class_Normal weight', 'Bmi_class_Obese', 'Bmi_class_Overweight', 'Bmi_class_Underweight', 'Goals_Maintain', 'Goals_Weight gain', 'Goals_Weight loss', 'Current_fitness_level_Advance', 'Current_fitness_level_Beginner', 'Current_fitness_level_Intermediate']], df['Intensity_level']

#Create and train model
model = LinearRegression().fit(inputs, targets)

# Create a DataFrame for user input
user_input = pd.DataFrame(input, index=[0])

# One-hot encode categorical columns in the user input
user_input_encoded = pd.DataFrame(encoder.transform(user_input[categorical_cols].fillna('N/A')), columns=encoded_cols)

# Concatenate the one-hot encoded features with numerical features
user_input_processed = pd.concat([user_input[['Gender', 'Age', 'Height', 'Weight', 'Bmi', 'Injury']], user_input_encoded], axis=1)

# Make predictions using the trained model
user_predictions = model.predict(user_input_processed)

# output_data = {'Intensity' : float(user_predictions[0])}

# rounded_value = np.ceil(float(user_predictions[0])).astype(int)
# rounded_value = int(rounded_value)

input['Intensity'] = np.round(float(user_predictions[0]))

print(json.dumps(input))

sys.stdout.flush()