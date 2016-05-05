import React, { Component } from 'react';
import Radium from 'radium';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';

export default Radium(() => {
  return (<p style={[CoreStyles.fontStyle]}>{Copy.lorem}</p>); 
});
