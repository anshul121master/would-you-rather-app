import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_POLL, ADD_QUESTION } from "../actions/shared";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ANSWER_POLL:
      const { authedUser, qid, answer } = action.details;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: 
            state[action.question.author].questions.concat([action.question.id]),  //state[johndoe]
            
          
        }
      };
    default:
      return state;
  }
}
