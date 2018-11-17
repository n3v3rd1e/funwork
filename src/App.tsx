import O from 'patchinko/constant';
import Snabbdom from 'snabbdom-pragma';
Snabbdom;

const actions = update => {
	return {
		increase: () => update({ count: O(value => value + 1) })
	};
};

const view = actions => model => {
	return (
		<div id="app">
			This is basic shit app. {model.count}
			<button
				class={{ button: true }}
				on={{
					click: actions.increase
				}}
			>
				Increase count
			</button>
		</div>
	);
};

export default function App(update) {
	return {
		model: () => ({
			count: 7
		}),
		view: view(actions(update))
	};
}
