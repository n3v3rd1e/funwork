export const state = {
	count: model => model.count
};

export const nap = actions => state => {
	console.log('Counter nap');

	if (state.count > 12) {
		actions.resetCount();
	}
};
