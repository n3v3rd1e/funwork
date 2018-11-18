import O from 'patchinko/immutable';
import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import flyd from 'flyd';

const patch = init([classMode, props, style, eventlisteners]);

interface Sources {
	DOM;
	router?;
	store?;
}

const createActions = present => ({
	increase: count => present({ count: count + 1 }),
	resetCount: () => present({ count: 4 })
});

const createNap = actions => state => {
	if (state.count >= 12) {
		setTimeout(() => actions.resetCount(), 2000);
	}
	console.log('in createNap');
}

export const run = (component, sources: Sources) => {
	const present = flyd.stream();
	const actions = createActions(present);
	const app = component(actions);
	const nap = createNap(actions);

	const models = flyd.scan(app.acceptor, app.initialModel(), present);
	const states = models.map(app.state);

	let element = sources.DOM;
	const render = view => { element = patch(element, view) };

	flyd.on(state => {
		const view = app.view(state);
		render(view);
	}, states)
	flyd.on(nap, states);
}
