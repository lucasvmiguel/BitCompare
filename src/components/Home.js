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
        <div className="flex-column center home-section">
          <div className="center">
            <img src="logo.png"/>
          </div>
          <div className="center search-section padding-top-2">
            <h1 className="color-light-blue">WE ALL COMPARE PRODUCTS</h1>
          </div>
          <div className="center search-section padding-top-2">
            <input type="text" name="search" className="input-search" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Procure por algum produto..."/>
            <button onClick={this.handleSubmit} className="btn-search">Buscar</button>
          </div>
          <div className="center color-light-blue">
            <p>Busque na americanas.com, submarino, shoptime, soubarato...</p>
          </div>
        </div>
        <div className="row padding-top-2 hidden-xs">
          <div className="col-xs-2 center category-item">
            <a href="/busca?conteudo=informatica">
              <img src="svgs/laptop.svg" className="width-3"/>
              <p>Informática</p>
            </a>
          </div>
          <div className="col-xs-2 center category-item">
            <a href="/busca?conteudo=smarthphone">
              <img src="svgs/smartphone.svg" className="width-3"/>
              <p>Smartphone</p>
            </a>
          </div>
          <div className="col-xs-2 center category-item">
            <a href="/busca?conteudo=eletrodomestico">
              <img src="svgs/microwave.svg" className="width-3"/>
              <p>Eletrodoméstico</p>
            </a>
          </div>
          <div className="col-xs-2 center category-item">
            <a href="/busca?conteudo=jogos">
              <img src="svgs/videogame.svg" className="width-3"/>
              <p>Jogos</p>
            </a>
          </div>
          <div className="col-xs-2 center category-item">
            <a href="/busca?conteudo=geladeira">
              <img src="svgs/fridge.svg" className="width-3"/>
              <p>Geladeira</p>
            </a>
          </div>
          <div className="col-xs-2 center category-item">
            <a href="/busca?conteudo=tv">
              <img src="svgs/computer.svg" className="width-3"/>
              <p>Televisão</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;