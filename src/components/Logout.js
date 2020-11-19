import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authUser";
import { Link } from "react-router-dom";

class Logout extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(handleLogout());
  }
  render() {
    return (
      <div className="logout">
        <h2>You have currently been logged out</h2>
        <Link to="/login">Proceed to login</Link>
      </div>
    );
  }
}

export default connect()(Logout);
