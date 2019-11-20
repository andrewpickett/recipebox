from recipebox_api.models import RecipeBoxUser, Recipe


def perform_login(name, password):
	return RecipeBoxUser(user_id=1, name=name, email='picketta@gmail.com', password=password)


def get_user_by_id(user_id):
	return RecipeBoxUser(user_id=user_id, name='Andrew', email='picketta@gmail.com', password='')


def get_recipes(user):
	recipes = [
		Recipe(recipe_id=1, user_id=1, name='Apple Pie'),
		Recipe(recipe_id=2, user_id=1, name='Cajun Chicken Pasta'),
		Recipe(recipe_id=3, user_id=1, name='Easy Mexican Casserole')
	]
	return recipes
