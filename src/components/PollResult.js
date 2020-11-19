import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ErrorPage from "./ErrorPage";

class PollResult extends Component {
  render() {
    if(this.props.invalidId) return <ErrorPage />
    let p = this.props;
    if ("authUser" in p) {
      const redirectTo = "/login";
      return <Redirect to={redirectTo} />;
    }

    const {
      optionOneText,
      optionTwoText,
      optionOneVotesCount,
      optionTwoVotesCount,
      answeredOption
    } = this.props;
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

function mapStateToProps({ authUser, questions }, ownProps) {
  if (authUser !== null) {
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
      else answeredOption = "You answered OptionTwo";
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
  } else
    return {
      authUser
    };
}

export default connect(mapStateToProps)(PollResult);
