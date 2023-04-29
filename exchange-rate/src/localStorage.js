export function saveUserToken(userToken) {
    localStorage.setItem("TOKEN", userToken);
    }
    export function getUserToken() {
    return localStorage.getItem("TOKEN");
    }
    export function clearUserToken() {
    return localStorage.removeItem("TOKEN");
    }
export function saveUserRole(userRole) {
    localStorage.setItem("Role", userRole);
    }
    export function getUserRole() {
        return localStorage.getItem("Role");
        }
    export function clearUserRole() {
        return localStorage.removeItem("Role");
        }
