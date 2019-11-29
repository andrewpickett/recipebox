import recipebox_api.database
from recipebox_api.models import Recipe
import bcrypt

import math
import re
from fractions import Fraction


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
	recipe = recipebox_api.database.find_recipe_by_id(recipe_id)
	recipe.tags = recipebox_api.database.find_tags_for_recipe(recipe_id)
	recipe.tags.sort()
	return recipe


def scale_ingredients(recipe, scale, is_decimal):
	scalar_frac = Fraction(scale)
	new_ingredient_list = []
	for ingredient in recipe.ingredient_list:
		idx = re.search("[a-zA-Z]", ingredient).start() - 1
		if idx > 0:
			print("Scaling {}, with quantity {}, by {}".format(ingredient, ingredient[0:idx], scale))
			quantity = ingredient[0:idx]
			first = _from_compound_fraction(quantity) if quantity.find(' ') > 0 else Fraction(quantity)
			scaled = first * scalar_frac
			if is_decimal:
				new_ingredient_list.append(str(scaled.numerator / scaled.denominator) + ingredient[idx:])
			else:
				new_ingredient_list.append(str(_to_compound_fraction(scaled)) + ingredient[idx:])
		else:
			print("No need to scale {}, as there's no quantity".format(ingredient))
			new_ingredient_list.append(ingredient)
	recipe.ingredient_list = new_ingredient_list


def _from_compound_fraction(frac_str):
	parts = frac_str.split(' ')
	frac = Fraction(parts[1])
	return Fraction(str(frac.numerator + (frac.denominator * int(parts[0]))) + "/" + str(frac.denominator))


def _to_compound_fraction(frac):
	if frac.numerator > frac.denominator:
		if frac.numerator % frac.denominator == 0:
			return str(math.floor(frac.numerator / frac.denominator))
		else:
			return str(math.floor(frac.numerator / frac.denominator)) + " " + str(frac.numerator % frac.denominator) + "/" + str(frac.denominator)
	else:
		return str(frac)
