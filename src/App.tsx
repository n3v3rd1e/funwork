import Title from '@components/Title/Title';
import nest from '@framework/utils/nest';
import O from 'patchinko/immutable';
import Snabbdom from 'snabbdom-pragma';
Snabbdom;

export default function App(actions) {
	// const createActions = present => ({
	// 	increase: count => present({ count: count + 1 })
	// });

	const acceptor = (model, proposal) => {
		console.log('inAcceptor');
		return O(model, proposal);
	};

	const countState = model => ({ count: model.count })

	const state = model => [
		countState
	].reduce((state, stateFunction) => O(state, stateFunction(state)), model);

	// const createNap = actions => state => {
	// 	console.log('in createNap');
	// }

	const createView = actions => {

		return model => {
			return (
				<div id="app">
					<div>
						Current count is: {model.count}
					</div>
					<div>
						<button on={{ click: () => actions.increase(model.count) }}>
							Increase count
						</button>
					</div>
				</div>
			)
		}

	}

	return {
		initialModel: () => ({ count: 7 }),
		acceptor,
		state,
		view: createView(actions)
	};

}
