import App from '@/App';
import { run } from '@framework/index';
import actions from './actions';
import { acceptor, model } from './model';
import { nap, state } from './state';

import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';

const patch = init([classMode, props, style, eventlisteners]);

const mount = selector => document.querySelector(selector);

run(
	{
		model,
		acceptor,
		state,
		actions,
		nap
	},
	App,
	mount('#app'),
	patch
);

if (module.hot) {
	module.hot.accept('@/App', () => {
		run(
			{
				model,
				acceptor,
				state,
				actions,
				nap
			},
			App,
			mount('#app'),
			patch
		);
	});
}
