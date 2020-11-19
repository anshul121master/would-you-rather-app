import { SET_AUTH_USER, LOGOUT } from '../actions/authUser';

export default function authUser(state = null, action) {
  if (action.type === SET_AUTH_USER) {
    return action.authUserId;
  }else if(action.type === LOGOUT)
    return null
  return state;
}