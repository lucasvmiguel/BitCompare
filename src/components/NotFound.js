import React from 'react';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
          <p>Busque na americanas.com, submarino, shoptime, soubarato...</p>
        </div>
      </div>
    );
  }
}

export default NotFound;