import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class PollTeaser extends Component {
  render() {
    let { id, text } = this.props;
    let viewPollLink = `/question/${id}`;

    return (
      <div className="question-info">
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
  const { id } = ownProps
  const text = `${questions[id].optionOne.text} OR ${questions[id].optionTwo.text}`;
  return {
    id,
    text
  };
}
export default connect(mapStateToProps)(PollTeaser);
