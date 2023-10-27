from connect import DbConnection

from logger import eprint
query_list = {
    "temp_query": "select * from employee"
}

def fetch_data(trend_name):
    try:
        db_connection = DbConnection()
        db_connection.__connect__()
        query = query_list.get(trend_name)
        # eprint(query)
        result = db_connection.execute_query(query)
        # eprint(result)
        return result
    except Exception as e:
        print("Error in fetching data")

if __name__ == '__main__':
    result = fetch_data("temp_query")
    eprint(result)
