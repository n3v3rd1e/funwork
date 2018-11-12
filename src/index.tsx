import { hello } from '@framework/index';

import Snabbdom from 'snabbdom-pragma';
Snabbdom;
import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';

import App from '@/App';

const patch = init([
	classMode,
	props,
	style,
	eventlisteners
]);

console.log('hello', hello);

import { add } from '../framework/modules/fok';

const app = document.querySelector('#app');
patch(app, <App />);

// if (module.hot) {
//   module.hot.accept('@/App', () => {
// 		const nextApp = require('@/App').default;
// 		console.log('nextApp', nextApp);
// 		patch(<App />, <nextApp />);
//   });
// }
