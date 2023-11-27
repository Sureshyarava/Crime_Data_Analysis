import os
# import cx_Oracle
import oracledb

class DbConnection:
    def __init__(self):
        self.username = os.environ.get('ORACLE_DB_USERNAME')
        self.pwd = os.environ.get('ORACLE_DB_PASSWORD')
        self.conn_string = "oracle.cise.ufl.edu:1521/orcl"
        self.conn = None
        self.cursor = None

    def __connect__(self):
        try:
            self.conn = oracledb.connect(user=self.username, password=self.pwd, dsn=self.conn_string)
            self.cursor = self.conn.cursor()
        except oracledb.DatabaseError as e:
            raise Exception("Error connecting to the database: {}".format(str(e)))

    def execute_query(self, query, type=''):
        if not self.cursor:
            raise Exception("Database connection is not established.")
        try:
            result = self.cursor.execute(query)
            if type == 'insert':
                return 
            else:
                data = []
                for row in result:
                    data.append(dict(zip([column[0] for column in result.description], row)))
                return data
        except oracledb.DatabaseError as e:
            raise Exception("Error executing query: {}".format(str(e)))

    
    def commit(self):
        if not self.conn:
            raise Exception("Database connection is not established.")
        try:
            self.conn.commit()
        except oracledb.DatabaseError as e:
            raise Exception("Error commiting transaction to database: {}".format(str(e)))
    
    
    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
    


if __name__ == '__main__':
    db_connection = DbConnection(db_username, db_password, db_conn_string)
    db_connection.__connect__()
    result = db_connection.execute_query("select * from employee")
    db_connection.close()
    print(result)
