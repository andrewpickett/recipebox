from pd_security.security import BcryptAuthenticator

import bcrypt


class RecipeBoxAuthenticator(BcryptAuthenticator):

    def get_user(self, name):
        return RecipeBoxAuthenticator(user_id=1, name='Andrew', email='picketta@gmail.com',
                                      password=bcrypt.hashpw('darkstar', bcrypt.gensalt()))
