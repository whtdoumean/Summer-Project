from smtplib import SMTP
from email.mime.text import MIMEText
from flask import Flask, request
import json

app = Flask(__name__)

def send_email(message):
    sender = "bryilyant16@gmail.com"
    password = "ddr4redz"

    server = SMTP("smtp.gmail.com", 507)
    server.starttls()

    try:
        server.login(sender, password)
        msg = MIMEText(message)
        msg["Subject"] = "Тестовая отправка письма"
        server.sendmail(sender, sender, msg.as_string)

        return "The message send successfully"
    except Exception as _ex:
        return f"{_ex}\n error!"

@app.route('/', methods=['POST', 'GET'])
def boom():
    if request.method == 'GET':
        return 'omg wtf boom'

@app.route('/postemail', methods=['POST', 'GET'])
def form():
    if request.method == 'POST':
        name = request.form.get('name')
        num = request.form.get('phone-number')
        sel = request.form.get('input-yacht')

        response = {"message": [name, num, sel]}
        json.dumps(response)
        print(response)
        
        return response
    if request.method == 'GET':
        return 'omg wtf'
    

if __name__ == "__main__":
    app.run(debug=True)