import React, { Component } from "react";
import { connect } from "react-redux";

class UserCard extends Component {
  render() {
    const { username, avatar } = this.props;
    return (
      <div style={{backgroundColor: "rgb(66, 82, 101)", margin:20, borderRadius:5}} className="userCard">
        {this.props.componentName === "PollTeaser" ||
        this.props.componentName === "PollQuestion" ? (
          <h4 style={{color:"white", padding:10}} className="username">{username} asks would you rather</h4>
        ) : this.props.componentName === "PollResult" ? (
          <h4 style={{color:"white", padding:10}} className="username">Added By {username}</h4>
        ) : (
          <h4 style={{color:"white", padding:10}} className="username">{username}</h4>
        )}
        <div style={{padding:10}} className="usercard-container">
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
