import React, { Component } from "react";
import { connect } from "react-redux";
import { loadData } from "../actions/shared";
import Dashboard from "./Dashboard";
import PollDashboard from "./PollDashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LeaderboardDb from "./LeaderboardDb";
import Login from "./Login";
import Navigationbar from "./Navigationbar";
import NewQuestion from "./NewQuestion";
import ErrorPage from "./ErrorPage";
import Logout from './Logout'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadData());
  }
  render() {
    return (
      <Router>
        <div>
          {this.props.loading ? null : (
            <div>
              <Navigationbar />
              <div>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route
                    path="/question/:id"
                    exact
                    component={PollDashboard}
                  />
                  <Route path="/login" exact component={Login} />
                  <Route path="/logout" exact component={Logout} />
                  <Route path="/add" exact component={NewQuestion} />
                  <Route path="/leaderboard" exact component={LeaderboardDb} />
                  <Route component={ErrorPage} />
                </Switch>
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ loading }) {
  //debugger;
  return {
    loading
  };
}
export default connect(mapStateToProps)(App);
