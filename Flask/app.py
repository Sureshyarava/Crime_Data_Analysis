from flask import Flask, jsonify, request, Response
from main import fetch_data
from logger import eprint
import io
import matplotlib.pyplot as plt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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
        return jsonify({'Error' : str(e)})

@app.route('/plot')
def plot():
    # Create a simple Matplotlib plot
    # plt.plot([1, 2, 3, 4], [1, 4, 9, 16])

    # Save the plot to a BytesIO object
    # img_io = io.BytesIO()
    # plt.savefig(img_io, format='png')
    # img_io.seek(0)
    return {
        'Name':"geek", 
        "Age":"22",
        "Date": "25-09-2020", 
        "programming":"python"
        }
    # Return the image data as a response with the appropriate content type
    # return Response(img_io, content_type='image/png')

@app.route('/plot2')
def plot2():
    data = [1, 2, 3, 4, 5]  # Replace this with your data source
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
