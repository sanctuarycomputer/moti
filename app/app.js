import { render } from 'react-dom';
import Router from './config/Router';

document.body.style.backgroundColor = 'black';

render(Router, document.getElementById('app'));
