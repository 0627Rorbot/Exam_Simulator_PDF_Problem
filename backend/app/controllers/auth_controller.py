from werkzeug.security import check_password_hash
from app.models import get_user_collection, get_admin_collection

def authenticate_user(username, password):
    user_collection = get_user_collection()
    user = user_collection.find_one({"username": username})
    if user and check_password_hash(user['password'], password):
        return user
    return None

def check_admin(username):
    admin_collection = get_admin_collection()
    admin = admin_collection.find_one({"username": username})
    return bool(admin)
