import React from 'react';
import {Link} from 'react-router-dom';

const Menu = () => (
  <div className="row menu">
    <div className="col-xs-2 center padding-top-0-5">
      <Link to="/">
        <img className="width-1-5" src="svgs/search-icon.svg"></img>
      </Link>
    </div>
    <div className="col-xs-8 center padding-top-0-5">
      <img className="width-2" src="logo.png"></img>
    </div>
    <div className="col-xs-2 center padding-top-0-5">
      <Link to="/">
        <img className="width-1-5" src="svgs/user-blue.svg"></img>
      </Link>
    </div>
  </div>
);

export default Menu;