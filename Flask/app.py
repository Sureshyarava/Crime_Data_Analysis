from flask import Flask, jsonify, request, Response
from main import fetch_data
from logger import eprint
import io
import matplotlib.pyplot as plt
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)
# configure_logger(app, 'custom_logger')


def generate_sample_data():
    data = []
    current_year = datetime.date.today().year

    for year in range(current_year - 20, current_year + 1, 2):
        label = str(year) + '-' + str(year + 1)
        value = 500*(year -2000) # Adjust this as needed
        data_point = {'label': label, 'value': value}
        data.append(data_point)

    return data

@app.route('/bar_data', methods=['GET'])
def get_bar_data():
    data = generate_sample_data()
    return jsonify(data)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        trend_name = request.args.get('trend_name')
        # eprint("trend_name - {}".format(trend_name))
        if not trend_name:
            raise Exception("Trend Name is mandatory")
        data = fetch_data(trend_name)
        return jsonify(data)
    except Exception as e:
        return jsonify({'Error' : str(e)})

@app.route('/plot')
def plot():
    bar_data = {
        'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        'values': [10, 20, 15, 30, 25, 35],
    }
    return jsonify(bar_data)

if __name__ == '__main__':
    app.run(debug=True)
