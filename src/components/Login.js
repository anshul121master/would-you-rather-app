import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    authUserId: null,
    submit: false
  };
  handleUserChange = event => {
    const authUserId = event.target.value;

    this.setState(currentState => ({
      authUserId,
      submit: currentState.submit
    }));
  };

  handleLogin = event => {
    event.preventDefault();
    const { authUserId } = this.state;
    const { dispatch } = this.props;
    dispatch(setAuthUser(authUserId));
    this.setState({
      submit: true
    });
  };

  render() {
    const { submit } = this.state;

    if (submit ) {
     // debugger
      if(this.props.location.state === undefined){
        return <Redirect to='/' />;
      }else{
        const {from} = this.props.location.state
        return <Redirect to={from} />;
      }
      
    }
    const { userIds } = this.props;
    return (
      <div className="login">
        <form id="Login" onSubmit={this.handleLogin}>
          <div className="form-group">
            <select
              className="form-control"
              id="userId"
              onChange={this.handleUserChange}
            >
              <option></option>
              {userIds.map(userId => {
                return (
                  <option key={userId} value={userId}>
                    {userId}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.userSelected === ""}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users);
  return {
    userIds
  };
}
export default connect(mapStateToProps)(Login);
