// var snabbdom = require('snabbdom');
// var patch = snabbdom.init([ // Init patch function with chosen modules
//   require('snabbdom/modules/class').default, // makes it easy to toggle classes
//   require('snabbdom/modules/props').default, // for setting properties on DOM elements
//   require('snabbdom/modules/style').default, // handles styling on elements with support for animations
//   require('snabbdom/modules/eventlisteners').default, // attaches event listeners
// ]);
import Snabbdom from 'snabbdom-pragma';
Snabbdom;
// console.log('snabdom', Snabbdom);
import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';

import App from './App';

const patch = init([
	classMode,
	props,
	style,
	eventlisteners
]);

import { add } from '../framework/modules/fok';



console.log('add', add);
console.log('fok off');

const app = document.querySelector('#app');

patch(app, <App />);

console.log('app', app);
