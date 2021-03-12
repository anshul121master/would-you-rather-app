import { saveQuestion } from '../utils/api'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}


function addQuestion(res){
  return{
    type: ADD_QUESTION,
    res
  }
}

export function handleAddQuestion(details) {
  //{optionOne, optionTwo, author}
  return dispatch => {
    return saveQuestion(details).then(res => {
      dispatch(addQuestion(res));
    });
  };
}