import config from './config';
import axios from 'axios';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) {
			if (!error.config.url.endsWith('/login')) {
				window.location = '/logout';
			}
		}
		return Promise.reject(error);
	}
);

export default {
	user: {
		authenticated: false
	},

	login(viewState, redirect) {
		axios.post('/login', viewState.state, config.AXIOS_CONFIG)
			.then(response => {
				sessionStorage.setItem(config.JWT_STORAGE_KEY, response.headers.authorization);
				sessionStorage.setItem(config.USER_STORAGE_KEY, response.data['name']);
				axios.defaults.headers.post['Authorization'] = response.headers.authorization;
				this.user.authenticated = true;

				if (redirect) {
					window.location = redirect;
				}
			})
			.catch(error => {
				viewState.setState({'error': error.response.data})
			});
	},

	logout() {
		sessionStorage.removeItem(config.JWT_STORAGE_KEY);
		sessionStorage.removeItem(config.USER_STORAGE_KEY);
		this.user.authenticated = false;
		window.location = '/';
	},

	checkAuth() {
		let jwt = sessionStorage.getItem(config.JWT_STORAGE_KEY);

		if (jwt) {
			this.user.authenticated = true;
		} else {
			this.user.authenticated = false;
		}
	},

	getAuthHeader() {
		return {
			'Authorization': 'Bearer ' + sessionStorage.getItem(config.JWT_STORAGE_KEY)
		}
	}
}
