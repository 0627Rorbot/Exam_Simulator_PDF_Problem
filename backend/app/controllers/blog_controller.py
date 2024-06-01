from app.models import get_blog_collection
from bson.objectid import ObjectId

def get_all_posts():
    blog_collection = get_blog_collection()
    return list(blog_collection.find())

def create_post(title, content):
    blog_collection = get_blog_collection()
    blog_collection.insert_one({"title": title, "content": content})

def delete_post(post_id):
    blog_collection = get_blog_collection()
    blog_collection.delete_one({"_id": ObjectId(post_id)})
