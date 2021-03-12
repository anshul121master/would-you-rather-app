import React, { Component } from "react";

class Leaderboard extends Component {
  styles = {
    color: "rgb(121, 184, 243)",
    fontWeight: "bold",
    fontSize: "18px",
  };

  render() {
    const {
      questionsAnswered,
      questionsAsked,
      totalScore,
    } = this.props.userObj;
    return (
      <div className="leaderboard">
        <h4 style={this.styles}> Question Answered: {questionsAnswered}</h4>
        <h4 style={this.styles}>Question Asked: {questionsAsked}</h4>
        <h4 style={this.styles}>
          Total: <span className="leaderboardRank">{totalScore}</span>
        </h4>
      </div>
    );
  }
}

export default Leaderboard;
