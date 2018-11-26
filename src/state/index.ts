import {
	state as CounterState,
	nap as CounterNap
} from '@/modules/counter/state';
import route from './router';

export const state = {
	title: model => model.title,
	route,
	...CounterState
};

const napModules = [CounterNap];

export const nap = actions => state => {
	for (const napModule of napModules) {
		napModule(actions)(state);
	}
};

export const router = state => {
	const { history, location } = window;
	if (state.route === 'home') history.pushState(null, 'home', '/home');
	if (state.route !== 'home') history.pushState(null, 'fok', '/we-are-fokked');
}