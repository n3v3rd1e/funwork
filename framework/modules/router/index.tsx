import flyd from 'flyd';
import { rerender } from '@framework/index';

import Snabbdom from 'snabbdom-jsx';
Snabbdom;

const { history, location } = window;
const pathname = flyd.stream(location.pathname);

const createRouter = router => {
	const { routes, defaultLoader } = router;

	const routerView = flyd.stream(defaultLoader());
	console.log(1);
	const initRouting = () => {
		console.log(2);
		flyd.on(path => {
			const matchedRoute = routes.find(route => route.path === path);

			if (matchedRoute.loading) {
				const loading = Promise.resolve(matchedRoute.loading());
				loading.then(x => {
					routerView(x);
					rerender(!rerender);
				});
			}

			const component = Promise.resolve(matchedRoute.component());
			component.then(x => {
				routerView(x);
				rerender(!rerender);
			});
		}, pathname);
	};

	return { routerView, initRouting };
};

export default createRouter;
