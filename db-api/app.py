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
        return 'DB failure', 500
    cur = conn.cursor()
    cur.execute('SELECT * FROM Users WHERE id = %s', (user_id,))
    
    # Jsonify the result and return it
    user = cur.fetchone()
    cur.close()
    conn.close()
    if user:
        return {
            'id': user[0],
            'name': user[1],
            'type': user[2],
            'email': user[3],
            'phone_number': user[4],
            'membership_type': user[5]
        }, 200
    else:
        return 'User not found', 404

@app.route('/api/create-user', methods=['POST'])
def create_user():
    name = request.form.get('name')
    user_type = request.form.get('user_type')
    email = request.form.get('email')
    phone_number = request.form.get('phone_number')
    membership_type = request.form.get('membership_type')

    conn = get_db_connection()
    if not conn:
        return 'DB failure', 500
    cur = conn.cursor()

    cur.execute('INSERT INTO Users ("User name", "User type", "Email", "Phone number", "Membership type") VALUES (%s, %s, %s, %s, %s)', (name, user_type, email, phone_number, membership_type))
    conn.commit()

    cur.close()
    conn.close()

    return 'User inserted', 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5431)
