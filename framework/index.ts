import flyd from 'flyd';
import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import { rerender } from './modules/statefulComponent';
import { prepareState } from './utils';

export const patch = init([classMode, props, style, eventlisteners]);

export const run = (SAM, rootComponent, rootNode, patch) => {
	const present = flyd.stream();
	const actions = SAM.actions(present);
	const model = flyd.scan(SAM.acceptor, SAM.model, present);
	const state = flyd.map(prepareState(SAM.state), model);

	flyd.on(SAM.nap(actions), state);
	const view = flyd.combine(
		(rerender, state) => {
			return rootComponent({ actions, ...state() });
		},
		[rerender, state]
	);

	flyd.scan(
		(acc, val) => {
			return patch(acc, val);
		},
		rootNode,
		view
	);
};
