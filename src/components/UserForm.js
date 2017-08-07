import React from 'react';

import Menu from './Menu';
import Error from './Error';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: '', email: '', password: '', confirmPassword: '', oldPassword: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.state[name] = value;
    this.setState(this.state);
    this.props.onChange(this.state);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onSubmit();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile;
    if (profile) {
      this.setState({name: profile.name, email: profile.email, password: profile.password, confirmPassword: profile.confirmPassword, oldPassword: profile.oldPassword});
    }
  }

  render() {
    return (
      <div>
        <Menu login={this.props.login} logout={this.props.logout} idUser={this.props.idUser}/>
        {this.props.loading && <p className="center padding-1"> Carregando... </p>}
        {!this.props.loading && 
        <div className="padding-top-3 center">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="dark-blue">Se inscrever</h1>
            </div>
          </div>
          <div className="row">
            {this.props.error && <div className="col-xs-12 padding-top-1">
              <Error error={this.props.error} />
            </div>}
          </div>
          <div className="row">
            <div className="col-xs-12 padding-top-1">
              <input type="text" name="email" className="text-input" value={this.state.email} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="E-mail" disabled={this.props.login}/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 padding-top-1">
              <input type="text" name="name" className="text-input" value={this.state.name} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Nome"/>
            </div>
          </div>
          {this.props.login &&           
            <div className="row padding-top-1">
              <div className="col-xs-12">
                <input type="password" name="oldPassword" className="text-input" value={this.state.oldPassword} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Senha antiga"/>
              </div>
            </div>}
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <input type="password" name="password" className="text-input" value={this.state.password} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Senha"/>
            </div>
          </div>
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <input type="password" name="confirmPassword" className="text-input" value={this.state.confirmPassword} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Confirmar senha"/>
            </div>
          </div>
          {this.props.login && 
            <div className="row padding-top-1">
              <div className="col-xs-12">
                <span className="center">*Os três campos de senha tem que ser preenchidos para alterar a senha, se não só será alterado o nome.</span>
              </div>
            </div>}
          <div className="row padding-top-1">
            <div className="col-xs-12">
              <button onClick={this.handleSubmit} className="text-submit">Enviar</button>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default UserForm;