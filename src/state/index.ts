import { state as CounterState, nap as CounterNap } from '@/modules/counter/state';

export const state = model => ({
	title: model.title,
	...CounterState(model)
})

const napModules = [
	CounterNap
]

export const nap = actions => state => {
	console.log('in NAP');
	for ( const napModule of napModules) {
		napModule(actions)(state);
	}
}