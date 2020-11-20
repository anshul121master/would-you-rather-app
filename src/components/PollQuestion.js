import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerPoll } from "../actions/shared";
import { Redirect } from "react-router-dom";
import ErrorPage from "./ErrorPage";

class PollQuestion extends Component {
  state = {
    optionSelected: "",
    answerSubmitted: false
  };
  handleInputChange = event => {
    let value = event.target.value;
    this.setState({
      optionSelected: value,
      answerSubmitted: false
    });
  };
  handlePollSubmit = event => {
    //debugger
    event.preventDefault();
    const { dispatch, authUser, id } = this.props;
    const answer = this.state.optionSelected;
    dispatch(
      handleAnswerPoll({
        authedUser: authUser,
        qid: id,
        answer
      })
    );
    this.setState(currentState => ({
      optionSelected: currentState.optionSelected,
      answerSubmitted: true
    }));
  };
  render() {
    if (this.props.invalidId) return <ErrorPage />;
    const { optionSelected, answerSubmitted } = this.state;
    const { optionOne, optionTwo, answered } = this.props;
    if( answered !== null )  return <Redirect to='/' />;
    let redirectTo = `/question/${this.props.id}/results`;
    if (answerSubmitted === true) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <div className="question-info">
        <form onSubmit={this.handlePollSubmit}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="questionPoll"
              id="optionOne"
              value="optionOne"
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" htmlFor="optionOne">
              {optionOne}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="questionPoll"
              id="optionTwo"
              value="optionTwo"
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" htmlFor="optionTwo">
              {optionTwo}
            </label>
          </div>
          <button
            className="btn btn-outline-primary m-15-top"
            type="submit"
            disabled={optionSelected === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authUser, questions }, ownProps) {
  const { id } = ownProps;
  if (id in questions) {
    let answered = null;
    const optionOne = questions[id].optionOne.text;
    const optionTwo = questions[id].optionTwo.text;
    const optionOneVotes = questions[id].optionOne.votes;
    const optionTwoVotes = questions[id].optionTwo.votes;
    if (optionOneVotes.includes(authUser) || optionTwoVotes.includes(authUser))
      answered = "You answered";
    return {
      optionOne,
      optionTwo,
      authUser,
      id,
      answered
    };
  } else
    return {
      invalidId: true
    };
}

export default connect(mapStateToProps)(PollQuestion);
