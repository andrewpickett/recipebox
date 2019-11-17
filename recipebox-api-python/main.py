from flask import Flask

app = Flask(__name__)

import recipebox_api.routes  # noqa: E402
