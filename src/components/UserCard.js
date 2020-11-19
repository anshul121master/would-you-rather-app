import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorPage from "./ErrorPage";

class UserCard extends Component {
  render() {
    if (this.props.invalidId) return <ErrorPage />;
    const { username, avatar } = this.props;
    return (
      <div className="userCard">
        <h3 className="username">{username}</h3>
        <div className='usercard-container'>
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
    if (id in questions) {
      let author = questions[id].author;
      username = users[author].name;
      avatar = users[author].avatarURL;
    } else {
      return {
        invalidId: true
      };
    }
  }

  return {
    username,
    avatar
  };
}

export default connect(mapStateToProps)(UserCard);
