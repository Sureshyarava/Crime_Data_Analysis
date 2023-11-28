from flask import Flask, jsonify, request, Response
from main import *
from logging.config import dictConfig
import logging
import sys
import random
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

def generate_token(type_of_user):
    temp = "L"
    if type_of_user == "User":
        temp = "U"
    elif type_of_user == "Police":
        temp = "P"
    token = str(random.randint(100,999)) + temp + str(random.randint(100,999))
    return token

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    firstname = data['firstname']
    lastname = data['lastname']
    hashed_pwd = data['hashed_pwd']
    type_of_user = data['type_of_user']
    email = data['email']
    try:
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get('signup')
        query = query.format(firstname, lastname, hashed_pwd, type_of_user, email)
        logger.info(str(query))
        db_connection.execute_query(query=str(query), type='insert')
        db_connection.commit()
        db_connection.close()
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
        result = db_connection.execute_query(str(query))
        logger.info(result)
        if not result:
            return {"message": "Username/password is not valid!"}, 400
        return {"message": "Username/password is valid!", "token" : "{0}".format(generate_token(result[0]['TYPEOFUSER']))}, 200
    except Exception as e:
        logger.error("Error during login: {}".format(e))
        return { "message" : "Internal Server Error - User login failed. Try again"}, 500

    
@app.route('/all_tuples_count', methods=['GET'])
def get_all_tuples_count():
    try:
        db_connection = DbConnection()
        db_connection.__connect__()
        query = """SELECT SUM(COUNT) AS TOTAL_TUPLE_COUNT FROM (
{}
)""".format("\n UNION \n".join([query_list['all_tuples_count'].format(table_name) for table_name in table_names]))
        eprint(query)
        data = db_connection.execute_query(query)
        return jsonify(data)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})

@app.route('/trend1', methods=['POST'])
def get_trend1():
    try:
        data = request.json
        trend_name = data.get('trend_name')
        input_params = data['params']
        if not trend_name:
            raise Exception("Trend Name is mandatory in payload")
        for param in input_params:
            if param not in valid_input_params[trend_name]:
                raise Exception("One or more input param provided is not valid for {}".format(trend_name))
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get(trend_name)
        query = query.format(str(input_params['season_name']), str(input_params['crime_type']).replace(']','').replace('[','').replace('"','\''))
        logger.info(query)
        result = db_connection.execute_query(query)
        return jsonify(result)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})


@app.route('/trend2', methods=['POST'])
def get_trend2():
    try:
        data = request.json
        trend_name = data.get('trend_name')
        input_params = data['params']
        if not trend_name:
            raise Exception("Trend Name is mandatory in payload")
        for param in input_params:
            if param not in valid_input_params[trend_name]:
                raise Exception("One or more input param provided is not valid for {}".format(trend_name))
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get(trend_name)
        query = query.format(str(input_params['district_name']), str(input_params['radius']))
        logger.info(query)
        result = db_connection.execute_query(query)
        return jsonify(result)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})


@app.route('/trend3', methods=['POST'])
def get_trend3():
    try:
        data = request.json
        trend_name = data.get('trend_name')
        input_params = data['params']
        if not trend_name:
            raise Exception("Trend Name is mandatory in payload")
        for param in input_params:
            if param not in valid_input_params[trend_name]:
                raise Exception("One or more input param provided is not valid for {}".format(trend_name))
        if not input_params['day_of_week']:
            input_params['day_of_week'] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get(trend_name)
        query = query.format(str(input_params['day_of_week']).replace(']','').replace('[','').replace('"','\''), str(input_params['crime_type']))
        logger.info(query)
        result = db_connection.execute_query(query)
        return jsonify(result)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})


@app.route('/trend5', methods=['POST'])
def get_trend5():
    try:
        data = request.json
        trend_name = data.get('trend_name')
        input_params = data['params']
        if not trend_name:
            raise Exception("Trend Name is mandatory in payload")
        for param in input_params:
            if param not in valid_input_params[trend_name]:
                raise Exception("One or more input param provided is not valid for {}".format(trend_name))
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get(trend_name)
        query = query.format(str(input_params['crime_category']))
        logger.info(query)
        result = db_connection.execute_query(query)
        return jsonify(result)
    except Exception as e:
        logger.error(str(e))
        return jsonify({'Error' : str(e)})


if __name__ == '__main__':
    app.run(debug=True)
