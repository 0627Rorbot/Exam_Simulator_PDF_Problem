from app.models import get_user_collection

def get_user_by_username(username):
    user_collection = get_user_collection()
    user = user_collection.find_one({"username": username})
    return user
