import bcrypt
from pdsecurity.security import JwtBcryptAuthenticator

import recipebox_api.services


class RecipeBoxAuthenticator(JwtBcryptAuthenticator):

	def get_user(self, name):
		return recipebox_api.services.get_user_by_name(name)

