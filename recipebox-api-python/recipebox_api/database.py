from pddatabase import mysql_db

import recipebox_api.queries
from recipebox_api.models import RecipeBoxUser, Recipe


def find_user_by_id(user_id):
	user = None
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.FIND_USER_BY_ID, (user_id,))
		user_data = cur.fetchone()
		if user_data:
			user = RecipeBoxUser(*user_data)

	return user


def find_user_by_name(name):
	user = None
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.FIND_USER_BY_NAME, (name,))
		user_data = cur.fetchone()
		if user_data:
			user = RecipeBoxUser(*user_data)

	return user


def find_recipes_for_user(user_id):
	recipes = []
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.FIND_RECIPES_FOR_USER, (user_id,))

		all_recipe_data = cur.fetchall()
		if all_recipe_data:
			for recipe_data in all_recipe_data:
				recipes.append(Recipe(*recipe_data))

	return recipes


def find_tags_for_recipe(recipe_id):
	tags = []
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.FIND_TAGS_FOR_RECIPE, (recipe_id,))

		all_tag_data = cur.fetchall()
		if all_tag_data:
			for tag_data in all_tag_data:
				tags.append(tag_data[2])

	return tags
