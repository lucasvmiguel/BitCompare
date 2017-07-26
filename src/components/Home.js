import React from 'react';
import {Link} from 'react-router-dom';

import Categories from './Categories';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.openMenuLogin = this.openMenuLogin.bind(this);
    this.closeMenuLogin = this.closeMenuLogin.bind(this);
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

  render() {
    return (
      <div className="height-100">
        <div className="center home-section">
          <div>
            <img src="logo.png"/>
          </div>
          <div className="padding-top-2">
            <h1 className="light-blue">WE ALL COMPARE PRODUCTS</h1>
          </div>
          <div className="padding-top-2">
            <input type="text" name="search" className="input-search" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Procure por algum produto..."/>
            <button onClick={this.handleSubmit} className="btn-search">Buscar</button>
          </div>
          <div className="padding-top-1 light-blue">
            <p>Busque na americanas.com, submarino, shoptime, soubarato...</p>
          </div>
        </div>
        <div className="user-icon">
          <img className="width-1-5 cursor-pointer" src="svgs/user-blue.svg" onClick={this.openMenuLogin}></img>
        </div>
        <div id="sidenavLogin" className="sidenav-right">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeMenuLogin}>&times;</a>
          {this.props.isLogged && <Link to="/login">Logar</Link>}
          {this.props.isLogged && <Link to="/inscrever">Criar conta</Link>}
          {!this.props.isLogged && <Link to="/perfil">Perfil</Link>}
          {!this.props.isLogged && <Link to="/favoritos">Favoritos</Link>}
          {!this.props.isLogged && <Link to="#">Logout</Link>}
        </div>
        <div className="hidden-md ">
          <Categories/>
        </div>
      </div>
    );
  }
}

export default Home;