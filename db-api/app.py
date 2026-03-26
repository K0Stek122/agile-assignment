from flask import Flask
import psycopg2

app = Flask(__name__)

@app.route('/healthcheck')
def healthcheck():
    return 'OK', 200

@app.route('/api/db-healthcheck', methods=['GET'])
def db_healthcheck():
    # Open postgres connection and check if it's alive
    try:
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            database="gym_pro",
            user="admin",
            password="CoolPass321"
        )
        conn.close()
        return 'DB is up', 200
    except psycopg2.Error as e:
        return 'DB is down', 500
    
app.run(host='localhost', port=5431)