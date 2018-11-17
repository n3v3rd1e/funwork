import O from 'patchinko/constant';
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


export const run = (main, sources: Sources) => {
	const update = flyd.stream();
	const app = main(update);
	const models = flyd.scan(O, app.model(), update);
	flyd.scan(
		(rootNode, model) => patch(rootNode, app.view(model)),
		sources.DOM,
		models
	);
};
