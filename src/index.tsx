import App from '@/App';
import { run } from '@framework/index';

const mount = selector => document.querySelector(selector);

run(App, {
	DOM: mount('#app')
});

if (module.hot) {
	module.hot.accept('@/App', () => {
		run(App, {
			DOM: mount('#app')
		});
	})
}
