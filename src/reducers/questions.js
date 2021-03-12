import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../actions/questions";
import { ANSWER_POLL } from "../actions/shared";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_POLL:
      const { updatedQuestion } = action.res;
      return {
        ...state,
        [updatedQuestion._id]: updatedQuestion
      };
      case ADD_QUESTION:
        const { newQuestion } = action.res;
        return{
          ...state,
          [newQuestion._id]: newQuestion
        }
    default:
      return state;
  }
}
