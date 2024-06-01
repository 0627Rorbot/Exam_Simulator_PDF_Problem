from flask import render_template, request, redirect, url_for, flash
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import app
from app.controllers.blog_controller import get_all_posts, create_post, delete_post
from app.controllers.auth_controller import check_admin

@app.route('/blog')
@jwt_required()
def blog():
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        flash("Admin access required", "danger")
        return redirect(url_for('home'))
    
    posts = get_all_posts()
    return render_template('blog.html', posts=posts)

@app.route('/blog/new', methods=['GET', 'POST'])
@jwt_required()
def new_blog_post():
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        flash("Admin access required", "danger")
        return redirect(url_for('home'))

    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        create_post(title, content)
        flash("Blog post created successfully", "success")
        return redirect(url_for('blog'))

    return render_template('blog_post.html')

@app.route('/blog/delete/<post_id>', methods=['POST'])
@jwt_required()
def delete_blog_post(post_id):
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        flash("Admin access required", "danger")
        return redirect(url_for('home'))
    
    delete_post(post_id)
    flash("Blog post deleted successfully", "success")
    return redirect(url_for('blog'))
