from flask import Flask, jsonify, request
from flask_cors import CORS
from database import MerchDatabase, ShowsDatabase  # Imports the class from database.py!
from dotenv import load_dotenv
load_dotenv()
import os
import smtplib
from  email.mime.text import MIMEText


app = Flask(__name__)
CORS(app)

merch_db = MerchDatabase()
shows_db = ShowsDatabase()

@app.route('/api/shows', methods=['GET'])
def get_events():
    return jsonify(shows_db.get_all_events())

@app.route('/api/shows', methods=['POST'])
def add_event():
    data = request.get_json()

    required_fields = ['date', 'location', 'city', 'state']

    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400
    event_id = shows_db.add_event(
        date=data['date'],
        location=data['location'],
        city=data['city'],
        state=data['state']
    )

    return jsonify({'id': event_id, 'message': 'event added'}), 201

@app.route('/api/shows', methods=['DELETE'])
def delete_event():
    data = request.get_json()
    events_ids = data.get('ids', [])

    if not events_ids:
        return jsonify({'error': 'No event IDs provided'}), 400
    deleted_count = shows_db.delete_events(events_ids)
    return jsonify({'deleted_count': deleted_count, 'message': 'events deleted'}), 200


    

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    return jsonify(merch_db.get_all_inventory())

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()

    required_fields = ['item', 'price', 'default_image', 'stock', 'description']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    colors = data.get('colors')
    product_id = merch_db.add_product(
        item=data['item'],
        price=data['price'],
        stock=data['stock'],
        description=data['description'],
        default_image=data['default_image'],
        colors=colors
    )

    return jsonify({'id': product_id, 'message': 'Product added'}), 201

@app.route('/api/contact', methods=['POST'])
def send_contact():
    data = request.get_json()

    required_fields = ['name', 'email', 'description']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    msg = MIMEText(f"From: {data['name']} ({data['email']})\n\n{data['description']}")
    msg['Subject'] = 'New Contact Form Submission'
    msg['From'] = os.environ['EMAIL_ADDRESS']
    msg['To'] = os.environ['CONTACT_EMAIL']

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(os.environ['EMAIL_ADDRESS'], os.environ['EMAIL_PASSWORD'])
            server.send_message(msg)
        return jsonify({'message': 'Message sent'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)