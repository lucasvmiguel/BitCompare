import React from 'react';
import {Link} from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.openMenuLogin = this.openMenuLogin.bind(this);
    this.closeMenuLogin = this.closeMenuLogin.bind(this);
  }

  openMenuLogin(event) {
    document.getElementById("sidenavLogin").style.width = '250px';
  }
  
  closeMenuLogin(event) {
    document.getElementById("sidenavLogin").style.width = '0';
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
          {this.props.isLogged && <Link to="/login">Logar</Link>}
          {this.props.isLogged && <Link to="/inscrever">Criar conta</Link>}
          {!this.props.isLogged && <Link to="/perfil">Perfil</Link>}
          {!this.props.isLogged && <Link to="/favoritos">Favoritos</Link>}
          {!this.props.isLogged && <Link to="#">Logout</Link>}
        </div>
      </div>
  )}
};

export default Menu;