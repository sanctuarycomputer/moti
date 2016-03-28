import { render } from 'react-dom';
import Router from './config/Router';

document.body.style.backgroundColor = 'black';
document.body.style.margin = 0;

render(Router, document.getElementById('app'));
