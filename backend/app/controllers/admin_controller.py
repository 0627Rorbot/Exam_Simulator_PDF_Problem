from app.models import get_admin_collection

def get_admins():
    admin_collection = get_admin_collection()
    return list(admin_collection.find())

def add_admin(username):
    admin_collection = get_admin_collection()
    admin_collection.insert_one({"username": username})

def remove_admin(username):
    admin_collection = get_admin_collection()
    admin_collection.delete_one({"username": username})
