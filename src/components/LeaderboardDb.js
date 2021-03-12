import React, { Component } from "react";
import { connect } from "react-redux";
import Leaderboard from "./Leaderboard";
import UserCard from "./UserCard";
import { Redirect } from "react-router-dom";

class LeaderboardDb extends Component {
  render() {
    const { authUser } = this.props;
    if (authUser === null) {
      const redirectTo = "/login";
      return (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: this.props.location }
          }}
        />
      );
    }
    const { users } = this.props;

    let usersInfo = Object.keys(users).map(userId => {
      let questionsAnswered = Object.keys(users[userId].answers).length;
      let questionsAsked = Object.keys(users[userId].questions).length;

      return {
        userId,
        questionsAnswered: questionsAnswered,
        questionsAsked: questionsAsked,
        totalScore: questionsAnswered + questionsAsked
      };
    });

    usersInfo.sort((a, b) => {
      if (b.totalScore < a.totalScore) return -1;
      if (b.totalScore > a.totalScore) return 1;
      return 0;
    });

    return (
      <div>
        <ul style={{paddingLeft:0}}>
          {usersInfo.map(userObj => {
            let leaderboard = <Leaderboard userObj={userObj} />;
            return (
              <li style={{listStyle:"none"}} key={userObj.userId}>
                <UserCard componentName="leaderboard" userId={userObj.userId}>
                  {leaderboard}
                </UserCard>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authUser, users }) {
  return {
    authUser,
    users
  };
}

export default connect(mapStateToProps)(LeaderboardDb);
