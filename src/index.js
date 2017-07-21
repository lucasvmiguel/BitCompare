import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// import store requirements
import reducers from './reducers'
import middlewares from './middlewares';

// import containers
import HomeContainer from './containers/Home';
import SearchContainer from './containers/Search';
import ProductContainer from './containers/Product';
import SignupContainer from './containers/Signup';
import LoginContainer from './containers/Login';
import NotFoundContainer from './containers/NotFound';

// import css files
import './styles.css';

// apply all reducers and middlewares
let store = createStore(reducers, middlewares);

const customHistory = createBrowserHistory();

// apply routes - the routes order is important!
const render = () => ReactDOM.render(
  <Provider store={store} >
    <Router history={customHistory} >
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/busca" component={SearchContainer} />
        <Route path="/produto/:id" component={ProductContainer} />
        <Route path="/inscrever" component={SignupContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route component={NotFoundContainer}/>
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));

registerServiceWorker();

render();
store.subscribe(render);