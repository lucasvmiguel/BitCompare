import React from 'react';

import Menu from './Menu';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    // this.setState({value: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Menu />
        
        <div className="padding-top-3 center">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="dark-blue">Acesse sua conta</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 padding-top-1">
              <input type="text" name="login-email" className="login-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="E-mail"/>
            </div>
          </div>
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <input type="text" name="login-email" className="login-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Senha"/>
            </div>
          </div>
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <button onClick={this.handleSubmit} className="login-submit">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;