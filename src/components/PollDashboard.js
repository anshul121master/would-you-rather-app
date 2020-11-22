import React, { Component } from "react";
import { connect } from "react-redux";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";
import UserCard from "./UserCard";
import ErrorPage from "./ErrorPage";
import { Redirect } from "react-router-dom";

class PollDashboard extends Component {
  render() {
    //if authUser is null then redirect to login with current location details.
    if (this.props.authUser === null)
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );
    else if (this.props.invalidId === true) return <ErrorPage />;
    else {
      const { id, answered } = this.props;
      let componentToRender = null;
      let componentName = null;
      if (answered === true) {
        componentToRender = <PollResult id={id} />;
        componentName = "PollResult";
      } else {
        componentToRender = <PollQuestion id={id} />;
        componentName = "PollQuestion";
      }
      return (
        <UserCard componentName={componentName} id={id}>
          {componentToRender}
        </UserCard>
      );
    }
  }
}

function mapStateToProps({ authUser, questions }, ownProps) {
  if (authUser !== null) {
    const { id } = ownProps.match.params;
    //check if id is valid or not
    if (id in questions) {
      //check if authUser has answered to this ques id
      let answered = false;
      const optionOneVotes = questions[id].optionOne.votes;
      const optionTwoVotes = questions[id].optionTwo.votes;
      if (
        optionOneVotes.includes(authUser) ||
        optionTwoVotes.includes(authUser)
      )
        answered = true;
      return {
        authUser,
        id,
        answered,
        invalidId: false
      };
    } else
      return {
        authUser,
        invalidId: true
      };
  } else
    return {
      authUser
    };
}

export default connect(mapStateToProps)(PollDashboard);
