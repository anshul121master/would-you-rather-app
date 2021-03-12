import endpoints from "./config"

const {questions, users, addQuestions, answer} = endpoints;

function getUsers () {
  return fetch(users).then(res => res.json())
}

function getQuestions () {
  return fetch(questions).then(res => res.json())
}

export function getData() {
  return Promise.all([getUsers(), getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function saveQuestion(info) {
  //info: {optionOneText, optionTwoText, author}
  const reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(addQuestions, reqObj).then(res => res.json());
}

export function saveQuestionAnswer(info) {
  //info:{authedUser, qid, answer}
  const reqObj = {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(answer, reqObj).then(res => res.json());
}