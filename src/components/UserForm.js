import React from 'react';

import Menu from './Menu';

class UserForm extends React.Component {
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
              <h1 className="dark-blue">Se inscrever</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 padding-top-1">
              <input type="text" name="form-email" className="text-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="E-mail"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 padding-top-1">
              <input disabled={!this.props.isNewUser} type="text" name="form-name" className="text-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Nome"/>
            </div>
          </div>
          {!this.props.isNewUser &&           
            <div className="row padding-top-1">
              <div className="col-xs-12">
                <input type="password" name="form-old-password" className="text-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Senha antiga"/>
              </div>
            </div>}
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <input type="password" name="form-password" className="text-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Senha"/>
            </div>
          </div>
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <input type="password" name="form-confirm-password" className="text-input" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Confirmar senha"/>
            </div>
          </div>
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <button onClick={this.handleSubmit} className="text-submit">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;