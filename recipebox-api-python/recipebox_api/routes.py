from flask import redirect, request, make_response
from flask_cors import CORS

from main import app
from recipebox_api.security import RecipeBoxAuthenticator
from pd_security.jwt_utils import protect_with_jwt

from config import config

JWT_SECRET_KEY = config['jwt']['secret_key']
JWT_EXPIRE_SECS = config['jwt']['expire_seconds']
JWT_ALGO = config['jwt']['algorithm']
JWT_ISSUER = config['jwt']['issuer']

CORS(app, supports_credentials=True, expose_headers=["Authorization", "WWW-Authenticate"])


@app.route('/register', methods=['POST'])
def register_user():
    resp = make_response("")


@app.route('/login', methods=['POST'])
def perform_login():
    resp = make_response("")
    try:
        jwt_token = RecipeBoxAuthenticator(
            jwt_algorithm=JWT_ALGO, jwt_expire_secs=JWT_EXPIRE_SECS,
            jwt_issuer=JWT_ISSUER, jwt_secret_key=JWT_SECRET_KEY
        ).login(request.json["name"], request.json["password"].encode("utf-8"))
        resp.headers["Authorization"] = str(jwt_token)
    except PermissionError:
        resp = make_response("Invalid credentials", 401)
    except TypeError:
        resp = make_response("Something went horribly wrong", 500)
    return resp


@app.route('/recipebox', methods=['POST'])
@protect_with_jwt
def recipe_box():
    return "This is a protected page, your personal recipe box."


@app.errorhandler(401)
def custom_401(error):
    return redirect("/login", code=401)
