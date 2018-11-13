import Snabbdom from 'snabbdom-pragma';
Snabbdom;
import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';
import toVnode from 'snabbdom/es/tovnode';

import App from '@/App';

const patch = init([classMode, props, style, eventlisteners]);

const app = document.querySelector('#app');
patch(app, <App />);

if (module.hot) {
	module.hot.accept('@/App', () => {
		const newApp = toVnode(document.querySelector('#app'));
		patch(newApp, <App />);
	});
}
