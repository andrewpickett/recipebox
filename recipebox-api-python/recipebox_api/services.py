import recipebox_api.database
from recipebox_api.models import Recipe


def get_user_by_id(user_id):
	return recipebox_api.database.find_user_by_id(user_id)


def get_user_by_name(name):
	return recipebox_api.database.find_user_by_name(name)


def get_user_by_email(email):
	return recipebox_api.database.find_user_by_email(email)


def get_recipes(user_id):
	recipes = recipebox_api.database.find_recipes_for_user(user_id)
	recipes.sort()

	# TODO: Make tags a part of the main call, not like this...
	for recipe in recipes:
		recipe.tags = recipebox_api.database.find_tags_for_recipe(recipe.id)
		recipe.tags.sort()

	return recipes
