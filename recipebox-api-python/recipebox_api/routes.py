import jsonpickle
from flask import redirect, request, make_response
from flask_cors import CORS
from pdsecurity.jwt_utils import protect_with_jwt, get_jwt_object_from_request, _parse_jwt_token

import re
from fractions import Fraction

import recipebox_api.services
from main import app
from pdsecurity_config import pdsecurity_config
from recipebox_api.security import RecipeBoxAuthenticator

CORS(app, supports_credentials=True, expose_headers=["Authorization", "WWW-Authenticate"])


@app.route('/account/create', methods=['POST'])
def register_user():
	if recipebox_api.services.create_user(request.json) != 1:
		return make_response(500)
	return make_response("")


@app.route('/login', methods=['POST'])
def perform_login():
	try:
		authenticator = RecipeBoxAuthenticator(pdsecurity_config['jwt'])
		jwt_token = authenticator.login(request.json["email"], request.json["password"].encode("utf-8"))
		jwt_obj = _parse_jwt_token(jwt_token)
		resp = make_response(jsonpickle.encode(recipebox_api.services.get_user_by_id(jwt_obj['userId'])))
		resp.headers["Authorization"] = str(jwt_token)
	except PermissionError:
		resp = make_response("Invalid credentials", 401)
	except TypeError:
		resp = make_response("Something went horribly wrong", 500)
	return resp


@app.route('/recipes', methods=['POST'])
@protect_with_jwt
def recipe_box():
	jwt_obj = get_jwt_object_from_request(request)
	return jsonpickle.encode(recipebox_api.services.get_recipes(jwt_obj['userId']), unpicklable=False)


@app.route('/recipes/<recipe_id>', methods=['POST'])
@protect_with_jwt
def recipe_details(recipe_id):
	return jsonpickle.encode(recipebox_api.services.get_recipe(recipe_id), unpicklable=False)


@app.route('/recipes/<recipe_id>/scale', methods=['POST'])
@protect_with_jwt
def scale_recipe(recipe_id):
	recipe = recipebox_api.services.get_recipe(recipe_id)
	scale = request.get_json()['scale']

	recipebox_api.services.scale_ingredients(recipe, scale, False)
	return jsonpickle.encode(recipe, unpicklable=False)


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
