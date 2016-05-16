import React from 'react';

import ReactRouter, {
  Route,
  IndexRoute
} from 'react-router';

import App from '../handlers/App';
import Home from '../handlers/Home';
import PermanentGallery from '../components/PermanentGallery';

import Information from '../handlers/information/Information';
import InformationIndex from '../handlers/information/Index';
import InformationCurators from '../handlers/information/Curators';

export default (
  <Route path ='/' component={App}>
    <IndexRoute component={Home} />

    <Route path='information' component={Information}>
      <IndexRoute component={InformationIndex} />
      <Route path=':mode' component={InformationCurators} />
    </Route>

    <Route path='permanent-collection' component={PermanentGallery}/>
  </Route>
);
