export const SET_AUTH_USER = 'SET_AUTH_USER';
export const LOGOUT = 'LOGOUT'

export function setAuthUser(authUserId) {
  return {
    type: SET_AUTH_USER,
    authUserId
  };
}

export function handleLogout(){
  return{
    type: LOGOUT
  }
}
