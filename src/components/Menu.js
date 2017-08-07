import React from 'react';
import {Link} from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.openMenuLogin = this.openMenuLogin.bind(this);
    this.closeMenuLogin = this.closeMenuLogin.bind(this);
    this.onClickToLogout = this.onClickToLogout.bind(this);
  }

  openMenuLogin(event) {
    document.getElementById("sidenavLogin").style.width = '250px';
  }
  
  closeMenuLogin(event) {
    document.getElementById("sidenavLogin").style.width = '0';
  }

  onClickToLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <div className="row menu">
          <div className="col-xs-2 center padding-top-0-5">
            <Link to="/">
              <img className="width-1-5" src="svgs/search-icon.svg" alt="search-icon"></img>
            </Link>
          </div>
          <div className="col-xs-8 center padding-top-0-5">
            <Link to="/">
              <img className="menu-logo" src="logo.png" alt="logo"></img>
              <span className="light-blue padding-1">BIT COMPARE</span>
            </Link>
          </div>
          <div className="col-xs-2 center padding-top-0-5">
            <img className="width-1-5 cursor-pointer" src="svgs/user-blue.svg" onClick={this.openMenuLogin} alt="user-icon"></img>
          </div>
        </div>
        <div id="sidenavLogin" className="sidenav-right">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeMenuLogin}>&times;</a>
          {!this.props.login && <Link to="/login">Logar</Link>}
          {!this.props.login && <Link to="/inscrever">Criar conta</Link>}
          {this.props.login && <Link to={'/perfil/'+this.props.idUser}>Perfil</Link>}
          {this.props.login && <Link to="/favoritos">Favoritos</Link>}
          {this.props.login && <a className="cursor-pointer" onClick={this.onClickToLogout}>Logout</a>}
        </div>
      </div>
  )}
};

export default Menu;