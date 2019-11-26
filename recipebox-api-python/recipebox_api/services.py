import recipebox_api.database
from recipebox_api.models import Recipe
import bcrypt


def get_user_by_id(user_id):
	return recipebox_api.database.find_user_by_id(user_id)


def get_user_by_name(name):
	return recipebox_api.database.find_user_by_name(name)


def get_user_by_email(email):
	return recipebox_api.database.find_user_by_email(email)


def create_user(user_creds):
	encrypted_password = bcrypt.hashpw(user_creds['password'].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
	user_id = recipebox_api.database.find_next_user_id()
	user = recipebox_api.models.RecipeBoxUser(user_id=user_id, name=user_creds['name'], password=encrypted_password, email=user_creds['email'])
	return recipebox_api.database.insert_user(user)


def get_recipes(user_id):
	recipes = recipebox_api.database.find_recipes_for_user(user_id)
	recipes.sort()

	# TODO: Make tags a part of the main call, not like this...
	for recipe in recipes:
		recipe.tags = recipebox_api.database.find_tags_for_recipe(recipe.id)
		recipe.tags.sort()

	return recipes


def get_recipe(recipe_id):
	return recipebox_api.database.find_recipe_by_id(recipe_id)
