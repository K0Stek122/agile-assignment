from flask import Flask, request
import psycopg2
import os

app = Flask(__name__)

@app.route('/healthcheck')
def healthcheck():
    return 'OK', 200

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'db'),
        port=int(os.getenv('DB_PORT', 5432)),
        database=os.getenv('DB_NAME', 'gym_pro'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'CoolPass321')
    )

@app.route('/api/db-healthcheck', methods=['GET'])
def db_healthcheck():
    # Open postgres connection and check if it's alive
    try:
        conn = get_db_connection()
        conn.close()
        return 'DB is up', 200
    except psycopg2.Error as e:
        return 'DB is down: ' + str(e), 500
    
@app.route('/api/get-user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    conn = get_db_connection()
    if not conn:
        return 'Failed to connect to the database', 500
    cur = conn.cursor()
    cur.execute('SELECT * FROM User WHERE [User ID] = %s', (user_id,))
    
    # Jsonify the result and return it
    user = cur.fetchone()
    cur.close()
    conn.close()
    if user:
        # Return a json of the user
        return {
            'user_id': user[0],
            'username': user[1],
            'user_type': user[2],
            'email': user[3],
            'phone_number': user[4],
            'membership_type': user[5]
        }, 200
    else:
        return 'User not found', 404

@app.route('/api/create-user', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    user_type = data.get('user_type')
    email = data.get('email')
    phone_number = data.get('phone_number')
    membership_type = data.get('membership_type')

    conn = get_db_connection()
    if not conn:
        return 'Failed to connect to the database', 500
    cur = conn.cursor()
    cur.execute('INSERT INTO User (username, user_type, email, phone_number, membership_type) VALUES (%s, %s, %s, %s, %s) RETURNING [User ID]',
                (username, user_type, email, phone_number, membership_type))
    
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {'user_id': user_id}, 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5431)