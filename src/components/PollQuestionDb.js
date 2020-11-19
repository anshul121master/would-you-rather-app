import React, { Component } from "react";
import PollQuestion from './PollQuestion'
import UserCard from './UserCard'

class PollQuestionDb extends Component{
    render(){
        const { id } = this.props.match.params
        const pollQuestion = <PollQuestion id={id} />
        return(
            <UserCard id={id}>{pollQuestion}</UserCard>
        )
    }
}

export default PollQuestionDb