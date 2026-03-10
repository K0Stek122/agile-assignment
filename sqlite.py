import sqlite3

class SQLite:
    def __init__(self, db_name : str):
        self.db_name = db_name
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

    def execute(self, command : str):
        try:
            self.cursor.execute(command)
            return self.cursor.fetchall()
        except sqlite3.OperationalError as e:
            return f"sqlite3.OperationalError:  {e}"