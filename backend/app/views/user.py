from app import app

@app.route('/user/<username>')
def user(username):
    return render_template('user.html', username=username)
