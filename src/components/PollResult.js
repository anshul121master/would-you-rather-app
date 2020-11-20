import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorPage from "./ErrorPage";
import { Redirect } from "react-router-dom";

class PollResult extends Component {
  render() {
    if(this.props.invalidId) return <ErrorPage />
    const {
      optionOneText,
      optionTwoText,
      optionOneVotesCount,
      optionTwoVotesCount,
      answeredOption
    } = this.props;
    if( answeredOption === null ) return <Redirect to='/' />
    let totalVotes = optionOneVotesCount + optionTwoVotesCount;
    return (
      <div className="pollResult">
        <h3 className="results">Poll Results</h3>
        <div className="optionBox">
          <h5 className="optionText">{optionOneText}</h5>
          <p className="noOfVotes">
            {optionOneVotesCount} out of {totalVotes}
          </p>
          <p className="votePercent">
            Percentage: {(optionOneVotesCount / totalVotes) * 100}
          </p>
        </div>
        <div className="optionBox">
          <h5 className="optionText">{optionTwoText}</h5>
          <p className="noOfVotes">
            {optionTwoVotesCount} out of {totalVotes}
          </p>
          <p className="votePercent">
            Percentage: {(optionTwoVotesCount / totalVotes) * 100}
          </p>
        </div>
        <h4 className="answeredOption">{answeredOption}</h4>
      </div>
    );
  }
}

//write logic to check whether authUser has answered to this ques id
function mapStateToProps({ authUser, questions }, ownProps) {
    const { id } = ownProps;
    if (id in questions) {
      const optionOneText = questions[id].optionOne.text;
      const optionTwoText = questions[id].optionTwo.text;
      const optionOneVotes = questions[id].optionOne.votes;
      const optionOneVotesCount = optionOneVotes.length;
      const optionTwoVotes = questions[id].optionTwo.votes;
      const optionTwoVotesCount = optionTwoVotes.length;
      let answeredOption = "";
      if (optionOneVotes.includes(authUser))
        answeredOption = "You answered OptionOne";
      else if (optionTwoVotes.includes(authUser))
        answeredOption = "You answered OptionTwo";
      else
        answeredOption = null
      return {
        optionOneText,
        optionTwoText,
        optionOneVotesCount,
        optionTwoVotesCount,
        answeredOption
      };
    } else
      return {
        invalidId: true
      };
}

export default connect(mapStateToProps)(PollResult);
