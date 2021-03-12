import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_POLL } from "../actions/shared";
import { ADD_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ANSWER_POLL:
      const { updatedUser } = action.res;
      return {
        ...state,
        [updatedUser.id]: updatedUser
      };
    case ADD_QUESTION:
      const user = action.res.updatedUser;
      return {
        ...state,
        [user.id]: user
      };
    default:
      return state;
  }
}
