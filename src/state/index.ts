import { state as CounterState, nap as CounterNap } from '@/modules/counter/state';

export const state = {
	title: model => model.title,
	...CounterState,
}

const napModules = [
	CounterNap
]

export const nap = actions => state => {
	for ( const napModule of napModules) {
		napModule(actions)(state);
	}
}