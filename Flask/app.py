from flask import Flask, jsonify, request, Response
from main import *
from logging.config import dictConfig
import logging
import sys
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

formatter = logging.Formatter('%(asctime)s %(levelname)s %(filename)s: message - %(message)s')
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(formatter)
logger = logging.getLogger('logger')
logger.setLevel(logging.DEBUG)
logger.addHandler(console_handler)
app.logger = logger


valid_input_params = {
    'trend1': ["crime_type"]
}

def generate_sample_data():
    data = []
    current_year = datetime.date.today().year
    for year in range(current_year - 20, current_year + 1, 2):
        label = str(year) + '-' + str(year + 1)
        value = int(datetime.datetime.now().microsecond) % 10000
        logger.info("Temp {}".format(value))
        data_point = {'label': label, 'value': value}
        data.append(data_point)

    return data

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    hashed_pwd = data['hashed_pwd']
    try:
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get('signup')
        query = query.format(username, hashed_pwd)
        logger.info(str(query))
        db_connection.execute_query(query=query, type='insert')
        return { "message" : "user signed up successfully"}, 200
    except Exception as e:
        logger.error("Error during signup: {}".format(e))
        return { "message" : "user sign up failed"}, 400

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    hashed_pwd = data['hashed_pwd']
    try:
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get('login')
        query = query.format(username, hashed_pwd)
        logger.info(str(query))
        result = db_connection.execute_query(query)
        # result = db_connection.cursor.execute("SELECT * FROM KONDURUS.users WHERE USERNAME = 'test_user' AND PASSWORD = 'test_password'")
        data = []
        for row in result:
            data.append(dict(zip([column[0] for column in result.description], row)))
        print(data)
        if not result:
            return {"message": "Invalid username or password"}, 400
        return {"message": "username and password valid"}, 200
    except Exception as e:
        logger.error("Error during login: {}".format(e))
        return { "message" : "Internal Server Error - User login failed. Try again"}, 500

@app.route('/bar_data', methods=['GET'])
def get_bar_data():
    data = generate_sample_data()
    logger.info("Bar Data {}".format(data))
    return jsonify(data)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        trend_name = request.args.get('trend_name')
        if not trend_name:
            raise Exception("Trend Name is mandatory")
        data = fetch_data(trend_name)
        return jsonify(data)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})
    
@app.route('/all_tuples_count', methods=['GET'])
def get_all_tuples_count():
    try:
        data = fetch_all_tuples_count()
        return jsonify(data)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})

@app.route('/trend1', methods=['POST'])
def get_trend1():
    try:
        data = request.json
        eprint(data)
        trend_name = data.get('trend_name')
        input_params = data['params']
        # if not trend_name:
        #     raise Exception("Trend Name is mandatory in payload")
        # for param in input_params:
        #     if param not in valid_input_params[trend_name]:
        #         raise Exception("One or more input param provided is not valid for {}".format(trend_name))
        data = fetch_data(trend_name)
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get(trend_name)
        # eprint(query)
        query = query.format(input_params['crime_type'])
        result = db_connection.execute_query(query)
        # eprint(result)
        return jsonify(result)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})


if __name__ == '__main__':
    app.run(debug=True)
