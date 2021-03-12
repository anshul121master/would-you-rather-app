import { getData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveQuestions } from "../actions/questions";
import { receiveUsers } from "../actions/users";
import { setLoading } from "../actions/loading";

export const ANSWER_POLL = "ANSWER_POLL";

let loading = false;
export function loadData() {
  return dispatch => {
    return getData().then(({ users, questions }) => {
      console.log(users)
      console.log(questions)
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(setLoading(loading));
    });
  };
}

function answerPoll(res) {
  return {
    type: ANSWER_POLL,
    res
  };
}

export function handleAnswerPoll(details) {
  //details:{authedUser, qid, answer}
  return dispatch => {
    //dispatch(answerPoll(details));
    return saveQuestionAnswer(details).then(res => {
      dispatch(answerPoll(res));
    }).catch(e => {
      console.warn("Error in Answering Poll", e);
      alert("There was an error Answering a Poll. Try Again.");
    });
  };
}

