from pd_security.models import ApplicationUser
from pd_security.security import JwtBcryptAuthenticator

import bcrypt


class RecipeBoxAuthenticator(JwtBcryptAuthenticator):

	def get_user(self, name):
		password = 'darkstar'.encode('utf-8')
		password = (bcrypt.hashpw(password, bcrypt.gensalt())).decode('utf-8')
		return ApplicationUser(user_id=1, name=name, email='picketta@gmail.com', password=password)
