from flask import redirect, request, make_response
from flask_cors import CORS

from main import app
from recipebox_api.security import RecipeBoxAuthenticator
import recipebox_api.services
import jsonpickle
from pdsecurity.jwt_utils import protect_with_jwt

from pdsecurity_config import pdsecurity_config

CORS(app, supports_credentials=True, expose_headers=["Authorization", "WWW-Authenticate"])


@app.route('/register', methods=['POST'])
def register_user():
	resp = make_response("")


@app.route('/login', methods=['POST'])
def perform_login():
	resp = make_response("")
	try:
		authenticator = RecipeBoxAuthenticator(pdsecurity_config['jwt'])
		jwt_token = authenticator.login(request.json["name"], request.json["password"].encode("utf-8"))
		resp.headers["Authorization"] = str(jwt_token)
	except PermissionError:
		resp = make_response("Invalid credentials", 401)
	except TypeError:
		resp = make_response("Something went horribly wrong", 500)
	return resp


@app.route('/recipes', methods=['POST'])
@protect_with_jwt
def recipe_box():
	return jsonpickle.encode(recipebox_api.services.get_recipes(None))


@app.route('/planner', methods=['POST'])
@protect_with_jwt
def planner():
	return "This is a protected page: your planner."


@app.route('/shopping', methods=['POST'])
@protect_with_jwt
def shopping_list():
	return "This is a protected page: your shopping list."


@app.errorhandler(401)
def custom_401(error):
	print("got an error logging in. Redirecting to /login")
	return redirect("/login", code=401)
