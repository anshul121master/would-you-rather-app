import React, { Component } from "react";
import PollResult from './PollResult'
import UserCard from './UserCard'

class PollResultDb extends Component{
render(){
    const { id } = this.props.match.params
    const pollResult = <PollResult id={id} />
        return(
            <UserCard id={id}>{pollResult}</UserCard>
        )
}
}

export default PollResultDb