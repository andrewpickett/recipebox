from pddatabase import mysql_db

import recipebox_api.queries
from recipebox_api.models import RecipeBoxUser, Recipe


def _find_user(query, param):
	user = None
	with mysql_db.open_db_connection() as cur:
		cur.execute(query, (param,))
		user_data = cur.fetchone()
		if user_data:
			user = RecipeBoxUser(*user_data)

	return user


def find_user_by_id(user_id):
	return _find_user(recipebox_api.queries.FIND_USER_BY_ID, user_id)


def find_user_by_name(name):
	return _find_user(recipebox_api.queries.FIND_USER_BY_NAME, name)


def find_user_by_email(email):
	return _find_user(recipebox_api.queries.FIND_USER_BY_EMAIL, email)


def find_next_user_id():
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.FIND_NEXT_USER_ID)
		user_id = cur.fetchone()[0]

	return user_id


def insert_user(user):
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.INSERT_USER, (user.id, user.name, user.email, user.password,))
		ret_count = cur.rowcount

	return ret_count


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


def find_recipe_by_id(recipe_id):
	with mysql_db.open_db_connection() as cur:
		cur.execute(recipebox_api.queries.FIND_RECIPE_BY_ID, (recipe_id,))

		recipe_data = cur.fetchone()
		if recipe_data:
			return Recipe(*recipe_data)

	return None
