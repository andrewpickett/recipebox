from pdsecurity.models import ApplicationUser
from pdsecurity.security import JwtBcryptAuthenticator

import recipebox_api.services

import bcrypt


class RecipeBoxAuthenticator(JwtBcryptAuthenticator):

	def get_user(self, name):
		password = 'darkstar'.encode('utf-8')
		password = (bcrypt.hashpw(password, bcrypt.gensalt())).decode('utf-8')
		return recipebox_api.services.perform_login(name, password)
