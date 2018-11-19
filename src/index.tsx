import App from '@/App';
import { run } from '@framework/index';
import actions from './actions';
import { acceptor, model } from './model';
import { nap, state } from './state';

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
	mount('#app')
);

if (module.hot) {
	module.hot.accept('@/App', () => {
		run(App, {
			DOM: mount('#app')
		});
	});
}
