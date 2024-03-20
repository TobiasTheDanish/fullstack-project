import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function clearJWT(): void {
	window.localStorage.removeItem("JWT");
}

function setJWT(token:string): void {
	window.localStorage.setItem("JWT", token);
}

function getJWT(): string {
	const token = window.localStorage.getItem("JWT");
	if(!token){
		console.log("jwt not found localStorage")
		return ""
	}
	return token;
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
