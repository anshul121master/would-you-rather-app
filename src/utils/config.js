const url = "http://localhost:9000";

const endpoints = {
    questions:`${url}/questions`,
    users:`${url}/users`,
    addQuestions:`${url}/questions/add`,
    answer:`${url}/questions/answer`,
}

module.exports = endpoints;