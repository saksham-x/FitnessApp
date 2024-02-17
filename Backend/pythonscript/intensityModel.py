# %%
import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression

#Load dataset
data_file_path = 'D:\\fitnesss_app\\fitness_app2.0\\fitnessapp_withml\\Backend\\pythonscript\\hamro_data.csv'
df = pd.read_csv(data_file_path)

#Encoding categorical columns
encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
categorical_cols = df.select_dtypes('object').columns.tolist()
encoder.fit(df[categorical_cols])
encoded_cols = list(encoder.get_feature_names_out(categorical_cols))
df[encoded_cols] = encoder.transform(df[categorical_cols].fillna('N/A'))

#Initialize and train model
model = LinearRegression()

#Error function
def rmse(targets, predictions):
    return np.sqrt(np.mean(np.square(targets-predictions)))

#Create inputs and targets
inputs, targets = df[['Gender','Age', 'Height', 'Weight', 'Bmi', 'Injury', 'Bmi_class_Normal weight', 'Bmi_class_Obese', 'Bmi_class_Overweight', 'Bmi_class_Underweight', 'Goals_Maintain', 'Goals_Weight gain', 'Goals_Weight loss', 'Current_fitness_level_Advance', 'Current_fitness_level_Beginner', 'Current_fitness_level_Intermediate']], df['Intensity_level']

#Create and train model
model = LinearRegression().fit(inputs, targets)

#Generating predictions
predictions  = model.predict(inputs)
predicted_df = pd.DataFrame({
                    'Actual' : targets,
                    'Predicted' : predictions
                })
predicted_df['Predicted'] = np.ceil(predicted_df['Predicted']).astype(int)
print(predicted_df)

#Compute Loss to evaluate the model
loss = rmse(targets, predictions)
print('Loss: ',loss)

# %%



