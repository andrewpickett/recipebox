from pd_security.models import ApplicationUser


class RecipeBoxUser(ApplicationUser):
    """Class representing a user of the application.

    Attributes:
        id: The id of the user
        name: The name of the user
        password: The password of the user
        email: The email of the user
    """

    def __init__(self, user_id=None, name=None, password=None, email=None):
        super().__init__(user_id=user_id, name=name, password=password, email=email)
        self.recipes = None


class Recipe:
    """Class representing a user's recipe.

    Attributes:
        id: The id of the recipe
        user_id: The user's id
        name: The name of the recipe
        description: The description of the recipe
        ingredients: The ingredients used in the recipe
        instructions: The instructions to make the recipe
        notes: Any additional notes for the recipe
        yield_amt: The number of services this recipe makes
    """

    def __init__(self, recipe_id=None, user_id=None, name=None, description=None, ingredients=None, instructions=None,
                 notes=None, yield_amt=None):
        self.id = int(recipe_id)
        self.user = ApplicationUser(user_id=user_id)
        self.name = name
        self.description = description
        self.ingredients = ingredients
        self.instructions = instructions
        self.notes = notes
        self.yield_amt = yield_amt

    def __str__(self):
        return "Recipe(id=%s, name=%)" % (self.id, self.name)
