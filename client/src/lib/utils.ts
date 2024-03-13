function clearJWT(): void {
	window.localStorage.removeItem("JWT");
}

function setJWT(token:string): void {
	window.localStorage.setItem("JWT", token);
}

function getJWT(): string {
	const token = window.localStorage.getItem("JWT");

	return token ?? "";
}

function isLoggedIn(): boolean {
	return window.localStorage.getItem("JWT") != null;
}

export const authManager = (() => {
	return {
		getJWT,
		setJWT,
		clearJWT,
		isLoggedIn,
	}
})();