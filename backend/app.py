from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
import random
from datetime import datetime
import json
import cloudinary
import cloudinary.uploader
import cloudinary.api

app = Flask(__name__)
CORS(app) 

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

database_url = os.environ.get('DATABASE_URL') 
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024 
app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT"))
app.config['MAIL_USE_TLS'] = False  
app.config['MAIL_USE_SSL'] = os.getenv("MAIL_USE_SSL") == "true"
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")


mail = Mail(app)
db = SQLAlchemy(app)

# --- IN-MEMORY OTP STORAGE ---
# Stores email -> OTP mapping. Example: {'user@test.com': '123456'}
otp_storage = {}
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# --- HELPER ---
def upload_to_cloudinary(file_obj, folder_name="confluence_uploads"):
    if not file_obj:
        return None
    try:
        # 1. Get the original filename (e.g., "my_file.pdf")
        filename = secure_filename(file_obj.filename)
        
        response = cloudinary.uploader.upload(
            file_obj, 
            folder=folder_name,
            resource_type="raw",    # <--- KEY CHANGE: Force RAW mode
            public_id=filename,     # We provide the name with extension
            use_filename=True,
            unique_filename=False,
            overwrite=True
        )
        print(response)
        return response.get('secure_url')
    except Exception as e:
        print(f"Cloudinary Error: {e}")
        return None

def save_file(file_obj):
    if file_obj and file_obj.filename != '':
        filename = secure_filename(file_obj.filename)
        unique_name = f"{int(datetime.utcnow().timestamp())}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_name)
        file_obj.save(file_path)
        return unique_name
    return None

def serialize_model(model_instance):
    """Converts a SQLAlchemy model instance into a dictionary."""
    if not model_instance:
        return None
    data = {}
    for column in model_instance.__table__.columns:
        data[column.name] = getattr(model_instance, column.name)
    return data
# --- MODELS ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    hackathon_registration = db.relationship('HackathonRegistration', backref='user', uselist=False)

class HackathonRegistration(db.Model):
    __tablename__ = 'hackathon_registrations'
    id = db.Column(db.Integer, primary_key=True)
    # Optional: link to logged-in user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    # Public registration ID like HACK0001
    registration_id = db.Column(db.String(20), unique=True, index=True)
    # ----------------------------
    # Team Information
    # ----------------------------
    team_name = db.Column(db.String(150), nullable=False)
    institution_name = db.Column(db.String(200), nullable=False)
    team_size = db.Column(db.Integer, nullable=False)
    # JSON string of members array
    members = db.Column(db.Text, nullable=False)
    # ----------------------------
    # Project Information
    # ----------------------------
    problem_domain = db.Column(db.String(150), nullable=False)
    project_title = db.Column(db.String(300), nullable=False)
    github_repo_link = db.Column(db.String(500), nullable=False)
    demo_video_url = db.Column(db.String(500), nullable=False)
    # ----------------------------
    # Files (store file paths)
    # ----------------------------
    ppt_file = db.Column(db.String(300), nullable=True)
    bonafide_file = db.Column(db.String(300), nullable=False)
    # ----------------------------
    # Agreement
    # ----------------------------
    agree_to_rules = db.Column(db.Boolean, default=False)
    # ----------------------------
    # Metadata
    # ----------------------------
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- ROUTES ---

@app.route('/setup-db')
def setup_db():
    with app.app_context():
        db.create_all()
    return "Database Tables Created Successfully!"

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    try:
        print("JSON RECEIVED:", request.json)

        data = request.json
        email = data.get('email')
        purpose = data.get('purpose', 'signup')

        if not email:
            return jsonify({'message': 'Email is required'}), 400

        existing_user = User.query.filter_by(email=email).first()

        if purpose == 'signup':
            if existing_user:
                return jsonify({'message': 'Email already registered'}), 400
        elif purpose == 'reset':
            if not existing_user:
                return jsonify({'message': 'No account found with this email'}), 404

        otp = str(random.randint(100000, 999999))
        otp_storage[email] = otp

        msg = Message(
            'Your Verification OTP',
            sender=app.config['MAIL_USERNAME'],
            recipients=[email]
        )
        msg.body = f"Your OTP is: {otp}"
        mail.send(msg)

        return jsonify({'message': 'OTP sent successfully'}), 200

    except Exception as e:
        print("🔥 OTP ERROR:", repr(e))
        return jsonify({
            'message': 'Failed to send OTP',
            'error': str(e)
        }), 500
    
@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')
    otp = data.get('otp')
    new_password = data.get('newPassword')

    # 1. Verify OTP
    if email not in otp_storage or otp_storage[email] != otp:
        return jsonify({'message': 'Invalid or expired OTP'}), 400

    # 2. Find User
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    try:
        # 3. Update Password (FIXED VARIABLE NAME)
        user.password = generate_password_hash(new_password)
        db.session.commit()
        
        # 4. Clear OTP
        del otp_storage[email]
        
        return jsonify({'message': 'Password reset successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Database error', 'error': str(e)}), 500

# 2. UPDATED ROUTE: SIGNUP (VERIFY & REGISTER)
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    user_otp = data.get('otp')
    password = data.get('password')

    # Verify OTP
    stored_otp = otp_storage.get(email)
    if not stored_otp or stored_otp != user_otp:
        return jsonify({"message": "Invalid or Incorrect OTP"}), 400

    # Create User
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='scrypt')
    new_user = User(email=email, password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()
    
    # Clean up OTP
    del otp_storage[email]

    return jsonify({"message": "Registration Successful!", "user_id": new_user.id}), 201

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login success", "user_id": user.id, "email": user.email})
    return jsonify({"message": "Invalid email or password"}), 401

@app.route('/api/status/<int:user_id>', methods=['GET'])
def get_status(user_id):
    idea = HackathonRegistration.query.filter_by(user_id=user_id).first()
    
    # Return the ACTUAL ID string (e.g., "IP0001") if it exists, else null
    return jsonify({
        "ideaPitching": idea.registration_id if idea else None
    })

@app.route('/api/registration', methods=['POST'])
def hackathon_registration():
    try:
        # ----------------------------
        # Optional user (if logged in)
        # ----------------------------
        user_id = request.form.get('userId')  # can be None
        # ----------------------------
        # Files
        # ----------------------------
        print(request.files)
        # Bonafide is mandatory
        bonafide_file = request.files.get('bonafideFile')
        if not bonafide_file:
            return jsonify({"message": "Bonafide file is required"}), 400

        bonafide_url = upload_to_cloudinary(bonafide_file, 'hackathon_bonafide')

        # PPT is optional
        ppt_file = request.files.get('pptFile')
        if ppt_file:
            ppt_url = upload_to_cloudinary(ppt_file, 'hackathon_ppt')
        else:
            ppt_url = None

        # ----------------------------
        # Create DB object
        # ----------------------------
        new_registration = HackathonRegistration(
            user_id=user_id,

            team_name=request.form.get('teamName'),
            institution_name=request.form.get('institutionName'),
            team_size=request.form.get('totalMembers'),

            members=request.form.get('members'),  # JSON string

            problem_domain=request.form.get('problemDomain'),
            project_title=request.form.get('projectTitle'),
            github_repo_link=request.form.get('githubRepoLink'),
            demo_video_url=request.form.get('demoVideoURL'),

            ppt_file=ppt_url,
            bonafide_file=bonafide_url,

            agree_to_rules=request.form.get('agreeToRules') == "true"
        )

        # ----------------------------
        # Generate Registration ID
        # ----------------------------
        db.session.add(new_registration)
        db.session.flush()  # gets ID without commit

        new_registration.registration_id = f"HACK{str(new_registration.id).zfill(5)}"

        db.session.commit()

        # ----------------------------
        # Optional email
        # ----------------------------
        if user_id:
            user = User.query.get(user_id)
            if user:
                msg = Message(
                    'Hackathon Registration Confirmed',
                    sender=app.config['MAIL_USERNAME'],
                    recipients=[user.email]
                )
                msg.body = f"""
Hello,

Your Hackathon registration was successful.

Your Registration ID: {new_registration.registration_id}

Good luck!
"""
                mail.send(msg)

        # ----------------------------
        # Success
        # ----------------------------
        return jsonify({
            "message": "Registration submitted successfully",
            "regId": new_registration.registration_id
        }), 201

    except Exception as e:
        db.session.rollback()
        print("Hackathon Registration Error:", e)
        return jsonify({
            "message": "Registration failed",
            "error": str(e)
        }), 500


@app.route('/api/admin/all-data', methods=['GET'])
def get_admin_data():
    try:
        # Fetch all records
        ideas = HackathonRegistration.query.all()

        user_count = User.query.count()
        # Serialize them
        return jsonify({
            "hackathon_registration": [serialize_model(i) for i in ideas],
            "totalUsers": user_count
        }), 200
    except Exception as e:
        return jsonify({"message": "Failed to fetch admin data", "error": str(e)}), 500

if __name__ == '__main__':
    # with app.app_context():
    #      db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)