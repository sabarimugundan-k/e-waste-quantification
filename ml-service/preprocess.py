import pandas as pd

def clean_data(df):
    """
    Dummy preprocessing for e-waste data.
    In a real scenario, this handles missing values, normalization, etc.
    """
    df = df.dropna()
    # Ensure types are correct
    if 'sales_import_tonnes' in df.columns:
        df['sales_import_tonnes'] = pd.to_numeric(df['sales_import_tonnes'], errors='coerce')
    if 'population_millions' in df.columns:
        df['population_millions'] = pd.to_numeric(df['population_millions'], errors='coerce')
    
    df = df.fillna(0)
    return df
