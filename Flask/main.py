from connect import DbConnection

from logger import eprint

table_names = ["SPABBATHI.IUCR", "SPABBATHI.FBI", "KONDURUS.LOCATION", "SPABBATHI.DISTRICT", "SPABBATHI.SEASON", "KONDURUS.DIVISION", "KONDURUS.GEO_COORDINATES"]

query_list = {
    "signup": """INSERT INTO "YARAVA.VENKATASU".Users (firstname, lastname, password, typeofUser, email) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')""",
    "login": """SELECT * FROM "YARAVA.VENKATASU".Users WHERE EMAIL = '{0}' AND PASSWORD = '{1}'""",
    "temp_query": "select * from employee",
    "all_tuples_count": "(SELECT COUNT(*) AS COUNT FROM {})",
    "trend1": """SELECT YEAR, COUNT(*) AS CRIME_COUNT
FROM 
(
  SELECT EXTRACT(YEAR FROM TIME_STAMP) AS YEAR, A.*
  FROM "YARAVA.VENKATASU".Crime_Incident A
  JOIN SPABBATHI.IUCR B ON A.IUCR_CODE=B.IUCR_CODE
  WHERE B.PRIMARY_DESCRIPTION = '{}'
)
GROUP BY YEAR ORDER BY YEAR """
}

def fetch_all_tuples_count():
    try:
        db_connection = DbConnection()
        db_connection.__connect__()
        query = """SELECT SUM(COUNT) AS TOTAL_TUPLE_COUNT FROM (
{}
)""".format("\n UNION \n".join([query_list['all_tuples_count'].format(table_name) for table_name in table_names]))
        eprint(query)
        result = db_connection.execute_query(query)
        return result
    except Exception as e:
        raise Exception(e)

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
        raise Exception(e)
        eprint("Error in fetching data")

if __name__ == '__main__':
    query = " UNION ".join([query_list['all_tuples_count'].format(table_name) for table_name in table_names])
    print(query)