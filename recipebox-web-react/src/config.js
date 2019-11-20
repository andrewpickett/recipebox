export default {
	BASE_URL: buildBaseUrl(),
	JWT_STORAGE_KEY: "recipebox.jwt",
	USER_STORAGE_KEY: "recipebox.user",
	AXIOS_CONFIG: {
	},
	allowedAnonymousRoutes: ['login']
}

function buildBaseUrl() {
	return 'http://localhost:5000';
}
