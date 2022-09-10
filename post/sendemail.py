import smtplib
import os
from email.mime.text import MIMEText
from flask import Flask, request    

app = Flask(__name__)

def send_email(message):
    sender = "bryilyant16@gmail.com"
    password = "ddr4redz"

    server = smtplib.SMTP("smtp.gmail.com", 507)
    server.starttls()

    try:
        server.login(sender, password)
        msg = MIMEText(message)
        msg["Subject"] = "Тестовая отправка письма"
        server.sendmail(sender, sender, msg.as_string)

        return "The message send successfully"
    except Exception as _ex:
        return f"{_ex}\n error!"

@app.route('', methods=['POST', 'GET'])
def form():
    if request.method == 'POST':
        name = request.form.get('name')
        num = request.form.get('phone-number')
        sel = request.form.get('input-yacht')
        print(name, num, sel)
    if request.method == 'GET':
        return 'omg wtf'
    

if __name__ == "__main__":
    app.run(debug=True)