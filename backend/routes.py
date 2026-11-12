from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

# Create a Blueprint for auth routes
auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# -------------------------
# Signup Route
# -------------------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 409

    # Hash password
    hashed_password = generate_password_hash(password)

    # Create user
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "✅ Signup successful!"}), 201


# -------------------------
# Login Route
# -------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    session["user_id"] = user.id
    session["user_name"] = user.name

    return jsonify({"message": "✅ Login successful!", "user": user.name})


# -------------------------
# Logout Route
# -------------------------
@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "✅ Logged out successfully"})
