import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    submit: false
  };

  handleChange = event => {
    if (event.target.name === "optionOne") {
      let value = event.target.value;
      this.setState(currentState => ({
        optionOneText: value,
        optionTwoText: currentState.optionTwoText,
        submit: currentState.submit
      }));
    } else {
      let value = event.target.value;
      this.setState(currentState => ({
        optionOneText: currentState.optionOneText,
        optionTwoText: value,
        submit: currentState.submit
      }));
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    const author = this.props.authUser;
    const dispatch = this.props.dispatch;
    const { optionOneText, optionTwoText } = this.state;
    dispatch(
      handleAddQuestion({
        author,
        optionOne:optionOneText,
        optionTwo:optionTwoText
      })
    );
    this.setState({
      submit: true
    });
  };
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

    const { submit } = this.state;
    if (submit) return <Redirect to="/" />;

    return (
      <div style={{marginLeft:"auto"}}>
        <h4>Would You Rather:</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="optionOne">Please enter Option One</label>
          <input
            required
            type="text"
            name="optionOne"
            id="optionOne"
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="optionTwo">Please enter Option Two</label>
          <input
            required
            type="text"
            name="optionTwo"
            id="optionTwo"
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
export default connect(mapStateToProps)(NewQuestion);
