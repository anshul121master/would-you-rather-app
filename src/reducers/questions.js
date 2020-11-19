import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ANSWER_POLL, ADD_QUESTION } from "../actions/shared";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_POLL:
      const { authedUser, qid, answer } = action.details; //details={authedUser: johndow, qid: xxx, answer: optionTwo}
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([
              authedUser
            ])
          }
        }
      };
      case ADD_QUESTION:
        return{
          ...state,
          [action.question.id]:{
            ...action.question
          }
           
          
        }
    default:
      return state;
  }
}
