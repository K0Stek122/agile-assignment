from flask import Flask

app = Flask(__name__)

@app.route('/api/account-mgmt/healthcheck')
def healthcheck():
    return 'OK', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5432)
