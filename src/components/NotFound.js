import React from 'react';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.openMenuLogin = this.openMenuLogin.bind(this);
    this.closeMenuLogin = this.closeMenuLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onClickToLogout = this.onClickToLogout.bind(this);
  }

  openMenuLogin(event) {
    document.getElementById("sidenavLogin").style.width = '250px';
  }
  
  closeMenuLogin(event) {
    document.getElementById("sidenavLogin").style.width = '0';
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      window.location = '/busca?conteudo=' + this.state.value;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location = '/busca?conteudo=' + this.state.value;
  }
    
  onClickToLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className="center height-100 notfound-section">
        <div>
          <h1 className="light-blue font-size-8">OPS!</h1>
        </div>
        <div className="padding-top-2">
          <h1 className="light-blue">PÁGINA NÃO ENCONTRADA</h1>
        </div>
        <div className="padding-top-2">
          <input type="text" name="search" className="input-search" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Procure por algum produto..."/>
          <button onClick={this.handleSubmit} className="btn-search">Buscar</button>
        </div>
        <div className="padding-top-1 light-blue">
          <p>Busque produtos em diversos e-commerces...</p>
        </div>
        <div className="user-icon">
          <img className="width-1-5 cursor-pointer" src="svgs/user-blue.svg" onClick={this.openMenuLogin} alt="user-icon"></img>
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
    );
  }
}

export default NotFound;