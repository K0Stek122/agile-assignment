from flask import Flask
import urllib.request

app = Flask(__name__)

@app.route('/api/get-membership-status/<int:member_id>', methods=['GET'])
def get_membership_status(member_id):
    # TODO: implement proper database and check if member_id is valid
    # send request to db-api to get user info and return membership status based on that
    contents = urllib.request.urlopen(f"http://db-api:5431/api/get-user/{member_id}").read()
    if contents:
        return 'Active', 200
    else:
        return 'Inactive', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5430)