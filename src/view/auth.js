let isLoggedIn = true;

export function login(username, password) {
  if (username === 'lara' && password === '12345') {
    isLoggedIn = true;
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return isLoggedIn;
}

export function logout() {
  isLoggedIn = false;
}
