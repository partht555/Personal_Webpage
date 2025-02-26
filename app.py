from flask import Flask, render_template, send_file, request, jsonify
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import io

app = Flask(__name__, static_folder='assets')
app.secret_key = os.environ.get("SESSION_SECRET")

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_file(f'assets/{path}')

@app.route('/download-resume')
def download_resume():
    try:
        return send_file(
            'attached_assets/Parth_Thakre_Resume.pdf',
            as_attachment=True,
            download_name='Parth_Thakre_Resume.pdf',
            mimetype='application/pdf'
        )
    except Exception as e:
        print(f"Error serving resume: {e}")
        return "Error downloading resume", 500

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        message = Mail(
            from_email='no-reply@portfolio.parththakre.com',
            to_emails='partht555@gmail.com',
            subject=f'Portfolio Contact from {data["name"]}',
            html_content=f'''
                <p><strong>Name:</strong> {data["name"]}</p>
                <p><strong>Email:</strong> {data["email"]}</p>
                <p><strong>Message:</strong></p>
                <p>{data["message"]}</p>
            '''
        )

        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Failed to send email"}), 500