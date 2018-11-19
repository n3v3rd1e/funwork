import Snabbdom from 'snabbdom-pragma';
Snabbdom;

import './Title.less';

const Title = actions => (state, children) => {
	let myTitle = 'fok';

	return (
		<div className="title">
			<div>
				<div>
					<span>This is my all mighty title from common state</span>
					<br />
					<h1>{state.title}</h1>
				</div>
				<div>
					<input
						type="text"
						on={{ input: e => actions.setTitle(e.target.value) }}
					/>
				</div>
			</div>
			<div>
				<div>
					<span>This is my components title</span>
					<br />
					<h1>{myTitle}</h1>
				</div>
				<div>
					<input
						type="text"
						on={{ input: e => myTitle = e.target.value }}
					/>
				</div>
			</div>
			<div>
				Im just lonely child
				<br />
				{children}
			</div>
		</div>
	);
};

export default Title;

// const actions = update => {
// 	return {
// 		setTitle: e => update({ title: e.target.value })
// 	};
// };

// const view = ({ actions }) => (model, children) => {
// 	const { setTitle } = actions;
// 	const { title, testing, random, fok } = model;
// 	console.log('in model', model);

// 	return (
// 		<div component="title">
// 			<div>{title}</div>
// 			<div>{testing}</div>
// 			<div>random shit: {random}</div>
// 			<div>Fok: {fok}</div>
// 			<div>{children}</div>
// 			<input
// 				type="text"
// 				on={{
// 					input: setTitle
// 				}}
// 			/>
// 		</div>
// 	);
// };

// export default update => {
// 	const computed = model => {
// 		model.random = 'random computed shit';
// 		return model;
// 	};

// 	return {
// 		model: () => ({
// 			title: 'This is my amazing app.',
// 			fok: 'default'
// 		}),
// 		view: model => view({ actions: actions(update) })(computed(model))
// 	};
// };
