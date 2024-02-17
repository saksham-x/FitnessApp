# %%
import sys
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression

# Check if command-line arguments are provided
if len(sys.argv) != 2:
    print("Usage: python script.py 'input_data_json'")
    sys.exit(1)

# Load dataset
#data_file_path = 'hamro_data.csv'
#df = pd.read_csv(data_file_path)
    
# Extract input data from command-line arguments
input_data_json = sys.argv[1]
input_data = json.loads(input_data_json)

# Create inputs and make predictions
inputs = pd.DataFrame([input_data])

# Encoding categorical columns
encoder = OneHotEncoder(handle_unknown='ignore')
categorical_cols = inputs.select_dtypes('object').columns.tolist()
encoder.fit(inputs[categorical_cols])
encoded_cols = list(encoder.get_feature_names_out(categorical_cols))
inputs[encoded_cols] = encoder.transform(inputs[categorical_cols].fillna('N/A'))

# Initialize and train model
model = LinearRegression()

# Generate predictions
predictions = model.predict(inputs)
predicted_df = pd.DataFrame({
    'Predicted': np.ceil(predictions).astype(int)
})
print(predicted_df.to_json(orient='records'))


# %%



