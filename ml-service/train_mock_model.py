import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

def train():
    # Create some dummy data to train a simple Linear Regression model
    data = {
        'sales_import_tonnes': [100, 150, 200, 250, 300],
        'population_millions': [1.0, 1.2, 1.4, 1.6, 1.8],
        'disposal_amount_tonnes': [50, 75, 100, 125, 150]
    }
    df = pd.DataFrame(data)
    X = df[['sales_import_tonnes', 'population_millions']]
    y = df['disposal_amount_tonnes']

    model = LinearRegression()
    model.fit(X, y)

    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print("Mock model trained and saved as model.pkl")

if __name__ == "__main__":
    train()
