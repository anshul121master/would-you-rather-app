import React, { Component } from "react";
import { connect } from "react-redux";
import PollQuestion from "./PollQuestion";
import UserCard from "./UserCard";
import { Redirect } from "react-router-dom";

class PollQuestionDb extends Component {
  render() {
    const { authUser } = this.props;
    if (authUser === null)
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );

    const { id } = this.props.match.params;
    const pollQuestion = <PollQuestion id={id} />;
    return <UserCard text='would you rather' id={id}>{pollQuestion}</UserCard>;
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(mapStateToProps)(PollQuestionDb);
