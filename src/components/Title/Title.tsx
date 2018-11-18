import Snabbdom from 'snabbdom-pragma';
Snabbdom;

const actions = update => {
	return {
		setTitle: e => update({ title: e.target.value })
	};
};

const view = ({ actions }) => (model, children) => {
	const { setTitle } = actions;
	const { title, testing, random, fok } = model;
	console.log('in model', model);

	return (
		<div component="title">
			<div>{title}</div>
			<div>{testing}</div>
			<div>random shit: {random}</div>
			<div>Fok: {fok}</div>
			<div>{children}</div>
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
			title: 'This is my amazing app.',
			fok: 'default'
		}),
		view: model => view({ actions: actions(update) })(computed(model))
	};
};
