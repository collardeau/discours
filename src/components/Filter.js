import React, {findDOMNode, Component} from 'react';
import Radium from 'radium';
import {light, primary} from '../styles/theme';

@Radium
export default class Content extends Component {

  render(){

    return (
      <ul>
        <li onClick={() => window.location.hash = 'new/root'}>New</li>
        <li onClick={() => window.location.hash = 'popular/root'}>Popular</li>
      </ul>
    );
  }

}
