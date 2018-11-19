import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import flyd from 'flyd';

const patch = init([classMode, props, style, eventlisteners]);

export const run = (SAM, rootComponent, rootNode) => {
	const present = flyd.stream();
	const actions = SAM.actions(present);
	const model = flyd.scan(SAM.acceptor, SAM.model, present);
	const state = flyd.map(SAM.state, model);
	flyd.on(SAM.nap(actions), state);
	const view = flyd.map(rootComponent(actions), state);

	flyd.scan(patch, rootNode, view);
}
