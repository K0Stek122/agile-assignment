import sqlite3

class SQLite:
    """Basic handler for sqlite, will be wrapped into an API that we can then specialise for our use case.
    """
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

class GymProDB(SQLite):
    def __init__(self):
        super().__init__("gympro.db")
    
    def CreateDatabaseSchema(self):
        # Jamie
        # Make sure to check if the schema doesn't already exist. We don't wanna overwrite all of our data if the db has existing users.
        pass