from abc import ABC, abstractmethod

import bcrypt
import datetime
import jwt


class ApplicationUser:
    """Class representing a user of the application.

    Attributes:
        id: The id of the user
        name: The name of the user
        password: The password of the user
        email: The email of the user
    """

    def __init__(self, user_id=None, name=None, password=None, email=None):
        self.id = int(user_id)
        self.name = name
        self.password = password
        self.email = email
        self.recipes = None

    def __str__(self):
        return "ApplicationUser(id=%s, name=%s)" % (self.id, self.name)


class Authenticator(ABC):

    @abstractmethod
    def login(self, name, password):
        pass


class BcryptAuthenticator(Authenticator):

    def __init__(self, jwt_issuer, jwt_expire_secs, jwt_algorithm, jwt_secret_key):
        self.jwt_issuer = jwt_issuer
        self.jwt_expire_secs = jwt_expire_secs
        self.jwt_algorithm = jwt_algorithm
        self.jwt_secret_key = jwt_secret_key

    @abstractmethod
    def get_user(self, name):
        pass

    def generate_jwt_token(self, user_id=None, name=None, role='User'):
        return jwt.encode({
            'userId': user_id,
            'role': role,
            'sub': name,
            'iat': int((datetime.datetime.now()).timestamp()),
            'iss': self.jwt_issuer,
            'exp': int((datetime.datetime.now() + datetime.timedelta(seconds=self.jwt_expire_secs)).timestamp())
        }, self.jwt_secret_key, algorithm=self.jwt_algorithm).decode('utf-8')

    def login(self, name, password):
        user = self.get_user(name)
        if not user or not bcrypt.checkpw(password, user.password.encode("utf-8")):
            raise PermissionError("Invalid credentials")

        return self.generate_jwt_token(user.id, user.name)
