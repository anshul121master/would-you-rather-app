import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class PollTeaser extends Component {
  render() {
    let { id, answered, text } = this.props;
    let viewPollLink = "";

    if (answered) viewPollLink = `/question/${id}/results`;
    else viewPollLink = `/question/${id}`;

    return (
      <div className="question-info">
      <h4>Would you rather:</h4>
        <p className="center">{text}</p>
        <Link to={viewPollLink} className="center">
          <button className="btn btn-outline-primary">
            View details
          </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ questions }, ownProps) {
  const { id, answered } = ownProps
  const text = `${questions[id].optionOne.text} OR ${questions[id].optionTwo.text}`;
  return {
    id,
    answered,
    text
  };
}
export default connect(mapStateToProps)(PollTeaser);
