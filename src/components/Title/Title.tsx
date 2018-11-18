import Snabbdom from 'snabbdom-pragma';
Snabbdom;

const actions = update => {
	return {
		setTitle: e => update({ title: e.target.value })
	};
};

const view = ({ actions }) => model => {
	const { setTitle } = actions;
	const { title, testing, random } = model;
	console.log('model', model);

	return (
		<div component="title">
			{title}
			{testing}
			random shit: {random}
			<input
				type="text"
				on={{
					input: setTitle
				}}
			/>
		</div>
	);
};

export default update => {
	const computed = model => {
		model.random = 'random computed shit';
		return model;
	};

	return {
		model: () => ({
			title: 'This is my amazing app.'
		}),
		view: model => view({ actions: actions(update) })(computed(model))
	};
};
