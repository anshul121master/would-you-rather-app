import React, { Component } from "react";

class Leaderboard extends Component {
  render() {
    const {
      questionsAnswered,
      questionsAsked,
      totalScore
    } = this.props.userObj;

    return(
        <div className='leaderboard'>
        <h4>Question Answered: {questionsAnswered}</h4>
        <h4>Question Asked: {questionsAsked}</h4>
        <h4>Total: <span className='leaderboardRank'>{totalScore}</span></h4> 
        </div>
    )
  }
}

export default Leaderboard