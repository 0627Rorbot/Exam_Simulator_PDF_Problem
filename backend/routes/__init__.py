from flask import Flask

# Import the route modules
from .questions import bp as exam

def register_routes(app: Flask):
    """
    A function to register all route blueprints to the Flask application.
    :param app: The Flask application instance.
    """

    app.register_blueprint(questions)
