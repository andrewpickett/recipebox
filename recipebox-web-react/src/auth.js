import config from './config';
import axios from 'axios';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) {
			window.location = '/login';
		}
		return Promise.reject(error);
	}
);

export default {
	user: {
		authenticated: false,
		admin: false
	},

	login(creds, redirect) {
		axios.post('/login', creds, config.AXIOS_CONFIG)
			.then(response => {
				sessionStorage.setItem(config.JWT_STORAGE_KEY, response.headers.authorization);
				axios.defaults.headers.post['Authorization'] = response.headers.authorization;
				this.user.authenticated = true;
				console.log("successful!");

				if (redirect) {
					window.location = redirect;
				}
			})
			.catch(error => {
				console.log(error);
			});
	},

	logout() {
		sessionStorage.removeItem(config.JWT_STORAGE_KEY);
		this.user.authenticated = false;
		this.user.admin = false;
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
