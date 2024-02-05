# Import the dependencies.
from flask import Flask, jsonify
import plotly.graph_objects as go
import pandas as pd


app = Flask(__name__)

# Read CSV
csv_file_path = "C:/Users/Joyjo/Downloads/jobs_in_data.csv"
df = pd.read_csv(csv_file_path)

# Define what to do when a user hits the index route.
@app.route("/")
def welcome():
    return (
        "The Highest paying job in the country is API!<br/>"
        "Available Routes:<br/>"
        "/api/v1.0/jobs-data"
    )

# Define what to do when a user hits the /normal route
@app.route("/normal")
def normal():
    return "Highest Paying Jobs"

# Define what to do when a user hits the /jsonified route
@app.route("/jsonified")
def jsonified():
    return jsonify({"Highest Paying Jobs": "Data"})

# API route for JSON data
@app.route('/api/v1.0/jobs-data')
def highest_paying_jobs_json():
    # Convert DataFrame to JSON
    data_json = df.to_json(orient='records')
    return jsonify(data_json)

# plot as JSON
@app.route('/api/v1.0/jobs-plot')
def highest_paying_jobs_plot():
    # Create a bar chart using plotly.graph_objects
    fig = go.Figure()
    fig.add_trace(go.Bar(x=df['Employee Residence'], y=df['Salary in USD'], name='Salary in USD'))
    fig.update_layout(title='Salary in USD by Country')

    # Convert the figure to JSON
    plot_json = fig.to_json()
    return jsonify(plot_json)

if __name__ == "__main__":
    app.run(debug=True)