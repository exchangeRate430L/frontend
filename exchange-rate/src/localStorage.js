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
export function saveUserUsdBalance(userUsdBalance) {
  localStorage.setItem("usdBalance", userUsdBalance);
}
export function getUserUsdBalance() {
  return localStorage.getItem("usdBalance");
}
export function clearUserUsdBalance() {
  return localStorage.removeItem("usdBalance");
}
export function saveUserLbpBalance(userLbpBalance) {
  localStorage.setItem("lbpBalance", userLbpBalance);
}
export function getUserLbpBalance() {
  return localStorage.getItem("lbpBalance");
}
export function clearUserLbpBalance() {
  return localStorage.removeItem("lbpBalance");
}
