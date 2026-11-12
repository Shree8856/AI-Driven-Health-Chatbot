import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from models import db, User
from routes import auth_bp

# -------------------------
# Load environment variables
# -------------------------
load_dotenv()

# -------------------------
# Create Flask app
# -------------------------
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "fallback_secret_key")

# -------------------------
# Enable CORS (for frontend-backend communication)
# -------------------------
CORS(app, supports_credentials=True)

# -------------------------
# PostgreSQL config
# -------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# -------------------------
# Init db
# -------------------------
db.init_app(app)

# -------------------------
# Register Blueprints
# -------------------------
app.register_blueprint(auth_bp)

# -------------------------
# Routes
# -------------------------
@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running 🚀"})

# -------------------------
# Run App
# -------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
