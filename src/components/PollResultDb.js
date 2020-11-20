import React, { Component } from "react";
import PollResult from "./PollResult";
import UserCard from "./UserCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class PollResultDb extends Component {
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
    const pollResult = <PollResult id={id} />;
    return <UserCard text='Added By' id={id}>{pollResult}</UserCard>;
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
export default connect(mapStateToProps)(PollResultDb);
