import React, { Component } from "react";
import { connect } from "react-redux";
import PollTeaser from "./PollTeaser";
import UserCard from "./UserCard";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  state = {
    showAnswered: false
  };
  filterQuestions = showAnswered => {
    this.setState({
       showAnswered
    });
  };
  render() {
    const { authUser } = this.props;
    if (authUser === null) {
      const redirectTo = "/login";
      return <Redirect to={{
        pathname: redirectTo,
        state: { from: '/' },
      }} />;
    }

    const { showAnswered } = this.state;
    return (
      <div>
        <div className="home-buttons">
          <button onClick={() => this.filterQuestions(false)}>
            Unanswered
          </button>
          <button onClick={() => this.filterQuestions(true)}>Answered</button>
        </div>

        <ul>
          {showAnswered
            ? this.props.answered.map(ques => {
                let pollTeaser = (
                  <PollTeaser id={ques.id} answered={showAnswered} />
                );
                return (
                  <li key={ques.id}>
                    <UserCard id={ques.id}>{pollTeaser}</UserCard>
                  </li>
                );
              })
            : this.props.unanswered.map(ques => {
                let pollTeaser = (
                  <PollTeaser id={ques.id} answered={showAnswered} />
                );
                return (
                  <li key={ques.id}>
                    <UserCard id={ques.id}>{pollTeaser}</UserCard>
                  </li>
                );
              })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authUser, users, questions }) {
  //  debugger
  let answered = null;
  let unanswered = null;
  if (authUser !== null) {
    const answeredIds = Object.keys(users[authUser].answers);
    answered = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    unanswered = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  return {
    answered,
    unanswered,
    authUser
  };
}

export default connect(mapStateToProps)(Dashboard);
