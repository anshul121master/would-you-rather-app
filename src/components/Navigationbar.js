import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

class Navigationbar extends Component {

  styles = {
    navContainer:{
    display:"flex",
    justifyContent:"space-between"
    },
    navItems:{
      color:"white"
    }
  }

  render() {
    return (
      <div>
        <nav style={{backgroundColor:"#0f171e"}} className="navbar navbar-expand ">
            <div className="collapse navbar-collapse" style={this.styles.navContainer}>
              <ul className="navbar-nav">
                <NavLink 
                  to="/"
                  exact
                  activeClassName="active"
                  className="nav-item nav-link"
                  style={this.styles.navItems}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/add"
                  exact
                  activeClassName="active"
                  className="nav-item nav-link"
                  style={this.styles.navItems}
                >
                  New Question
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  exact
                  activeClassName="active"
                  className="nav-item nav-link"
                  style={this.styles.navItems}
                >
                  Leaderboard
                </NavLink>
              </ul>
              {this.props.authUser !== null ? (
                <div>
                  <span style={this.styles.navItems} >
                    Hello {this.props.authUser}
                  </span>
                  <span style={{marginLeft:15}}>
                    <Link to="/logout">
                      <button className="btn-sm btn-info">Logout</button>
                    </Link>
                  </span>
                </div>
              ) : (
                <span style={this.styles.navItems}>
                  Hello
                </span>
              )}
            </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
export default connect(mapStateToProps)(Navigationbar);
