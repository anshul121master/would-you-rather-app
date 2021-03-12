import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class PollTeaser extends Component {
  btnStyle={
    padding:10,
    borderRadius:5,
    border:"2px solid white",
    color:"white",
    backgroundColor:"rgb(66, 82, 101)",
    ':hover':{
      backgroundColor:"white",
      color:"#017a9b",
      border:"2px solid #017a9b"
    }
  }
  render() {
    let { id, text } = this.props;
    let viewPollLink = `/question/${id}`;

    return (
      <div className="question-info">
        <p style={{color:"rgb(121, 184, 243)", fontWeight:"bold", fontSize:"18px"}} className="center">{text.charAt(0).toUpperCase()+text.substring(1)+' ?'}</p>
        <Link to={viewPollLink} className="center">
          <button style={this.btnStyle}>
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
