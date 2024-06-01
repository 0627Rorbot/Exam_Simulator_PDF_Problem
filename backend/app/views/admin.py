from flask import render_template, request, redirect, url_for, flash
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import app
from app.controllers.auth_controller import check_admin
from app.controllers.admin_controller import add_admin, remove_admin, get_admins

@app.route('/admin/manage', methods=['GET', 'POST'])
@jwt_required()
def manage_admins():
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        flash("Admin access required", "danger")
        return redirect(url_for('home'))

    admins = get_admins()
    if request.method == 'POST':
        username = request.form['username']
        add_admin(username)
        flash("Admin added successfully", "success")
        return redirect(url_for('manage_admins'))

    return render_template('manage_admins.html', admins=admins)

@app.route('/admin/remove/<username>', methods=['POST'])
@jwt_required()
def remove_admin_route(username):
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        flash("Admin access required", "danger")
        return redirect(url_for('home'))

    remove_admin(username)
    flash("Admin removed successfully", "success")
    return redirect(url_for('manage_admins'))
