from flask import Flask, jsonify, request
from main import fetch_data
from logger import configure_logger, eprint

app = Flask(__name__)
# configure_logger(app, 'custom_logger')


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
        return jsonify({'error' : str(e)})

if __name__ == '__main__':
    app.run(debug=True)
