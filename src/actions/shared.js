import { getData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveQuestions } from "../actions/questions";
import { receiveUsers } from "../actions/users";
import { setLoading } from "../actions/loading";

export const ANSWER_POLL = "ANSWER_POLL";
export const ADD_QUESTION = "ADD_QUESTION";

let loading = false;
export function loadData() {
  return dispatch => {
    return getData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(setLoading(loading));
    });
  };
}

function answerPoll(details) {
  return {
    type: ANSWER_POLL,
    details
  };
}

export function handleAnswerPoll(details) {
  return dispatch => {
    dispatch(answerPoll(details));
    return saveQuestionAnswer(details).catch(e => {
      console.warn("Error in Answering Poll", e);
      dispatch(answerPoll(details));
      alert("There was an error Answering a Poll. Try Again.");
    });
  };
}

function addQuestion(question){
  return{
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(details) {
  //{optionOneText, optionTwoText, author}
  return dispatch => {
    return saveQuestion(details).then(question => {
      dispatch(addQuestion(question));
    });
  };
}
