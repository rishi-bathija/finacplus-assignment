import { users } from "./users";

export function login(username, password) {
    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    if (!user) return null;

    const token = btoa(JSON.stringify(user));
    localStorage.setItem("token", token);
    return token;
}

export function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return JSON.parse(atob(token));
    } catch {
        return null;
    }
}
