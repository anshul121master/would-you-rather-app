import React, { Component } from "react";
import { connect } from "react-redux";

class UserCard extends Component {
  render() {
    const { username, avatar } = this.props;
    return (
      <div className="userCard">
        {this.props.componentName === "PollTeaser" ||
        this.props.componentName === "PollQuestion" ? (
          <h4 className="username">{username} asks would you rather</h4>
        ) : this.props.componentName === "PollResult" ? (
          <h4 className="username">Added By {username}</h4>
        ) : (
          <h4 className="username">{username}</h4>
        )}
        <div className="usercard-container">
          <img src={avatar} alt="userimage" />
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, ownProps) {
  let username = "";
  let avatar = "";
  if ("userId" in ownProps) {
    let userId = ownProps.userId;
    username = users[userId].name;
    avatar = users[userId].avatarURL;
  } else {
    let id = ownProps.id;
    let author = questions[id].author;
    username = users[author].name;
    avatar = users[author].avatarURL;
  }

  return {
    componentName: ownProps.componentName,
    username,
    avatar
  };
}
export default connect(mapStateToProps)(UserCard);
