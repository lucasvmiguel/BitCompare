import React from 'react';

class Home extends React.Component {
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
      <div>
        <div className="center home-section">
          <div>
            <img src="logo.png"/>
          </div>
          <div className="search-section padding-top-2">
            <h1 className="light-blue">WE ALL COMPARE PRODUCTS</h1>
          </div>
          <div className="search-section padding-top-2">
            <input type="text" name="search" className="input-search" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Procure por algum produto..."/>
            <button onClick={this.handleSubmit} className="btn-search">Buscar</button>
          </div>
          <div className="padding-top-1 light-blue">
            <p>Busque na americanas.com, submarino, shoptime, soubarato...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;