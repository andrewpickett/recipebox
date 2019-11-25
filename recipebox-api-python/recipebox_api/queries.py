FIND_USER_BY_NAME = """
    SELECT id, name, password, email FROM user WHERE name = %s
"""

FIND_USER_BY_ID = """
    SELECT id, name, password, email FROM user WHERE id = %s
"""

FIND_USER_BY_EMAIL = """
    SELECT id, name, password, email FROM user WHERE email = %s
"""

FIND_RECIPES_FOR_USER = """
    SELECT id, user_id, name, image_url, description, ingredients, instructions, notes, yield 
      FROM recipe 
     WHERE user_id = %s 
  ORDER BY name
"""

FIND_TAGS_FOR_RECIPE = """
    SELECT id, recipe_id, name FROM recipe_tag WHERE recipe_id = %s ORDER BY name
"""

FIND_NEXT_USER_ID = """
	SELECT MAX(id) + 1 FROM user
"""

INSERT_USER = """
	INSERT INTO user (id, name, email, password) VALUES (%s, %s, %s, %s)
"""
