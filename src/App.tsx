import Title from '@components/Title/Title';
import nest from '@framework/utils/nest';
import O from 'patchinko/constant';
import Snabbdom from 'snabbdom-pragma';
Snabbdom;

const actions = update => {
	return {
		increase: () => update({ count: O(value => value + 1) })
	};
};

const view = ({ components, actions }) => model => {
	const { MainTitle, SecondaryTitle } = components;
	const { increase } = actions;
	const { count, mainTitle, secondaryTitle } = model;

	return (
		<div id="app">
			<MainTitle mainTitle={{ ...mainTitle, testing: 'Fok oFF mATE' }}>
				Child inside
			</MainTitle>
			<SecondaryTitle
				secondaryTitle={{ ...secondaryTitle, testing: 'Who is mate, nigga' }}
			/>
			This is basic shit app. {count}
			<button
				class={{ button: true }}
				on={{
					click: increase
				}}
			>
				Increase count
			</button>
		</div>
	);
};

export default function App(update) {
	const mainTitle = nest(Title, update, ['mainTitle']);
	const secondaryTitle = nest(Title, update, ['secondaryTitle']);

	const components = {
		MainTitle: mainTitle.view,
		SecondaryTitle: secondaryTitle.view
	};

	return {
		model: () =>
			O(
				{
					count: 7
				},
				mainTitle.model(),
				secondaryTitle.model()
			),

		view: view({ components, actions: actions(update) })
	};
}
