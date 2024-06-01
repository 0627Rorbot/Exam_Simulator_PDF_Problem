from app import mongo

def get_user_collection():
    return mongo.db.users

def get_admin_collection():
    return mongo.db.admins

def get_blog_collection():
    return mongo.db.blog_posts

def get_problem_collection():
    return mongo.db.problems
