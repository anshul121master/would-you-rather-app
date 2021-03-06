import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerPoll } from "../actions/shared";
import { Redirect } from "react-router-dom";

class PollQuestion extends Component {
  state = {
    optionSelected: "",
    answerSubmitted: false
  };

  handleInputChange = event => {
    let value = event.target.value;
    this.setState({
      optionSelected: value,
    });
  };
  handlePollSubmit = event => {
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
    this.setState({
      answerSubmitted: true
    });
  };

  styles={
    text:{
      color:"rgb(121, 184, 243)", fontWeight:"bold", fontSize:"18px"
    },
    btnStyle:{
      marginTop:10,
      padding:8,
      borderRadius:5,
      border:"2px solid white",
      color:"white",
      backgroundColor:"rgb(66, 82, 101)",
      ':hover':{
        backgroundColor:"white",
        color:"#017a9b",
        border:"2px solid #017a9b"
      }
    }
  }
  render() {
    const { optionSelected, answerSubmitted } = this.state;
    const { optionOne, optionTwo } = this.props;
    let redirectTo = `/question/${this.props.id}`;
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
            <label style={this.styles.text} className="form-check-label" htmlFor="optionOne">
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
            <label style={this.styles.text} className="form-check-label" htmlFor="optionTwo">
              {optionTwo}
            </label>
          </div>
          <button  style={this.styles.btnStyle}
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
    const optionOne = questions[id].optionOne.text;
    const optionTwo = questions[id].optionTwo.text;
    return {
      optionOne,
      optionTwo,
      authUser,
      id
    };
  } 

export default connect(mapStateToProps)(PollQuestion);
