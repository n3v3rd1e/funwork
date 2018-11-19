export const state = model => ({
	count: model.count
});

export const nap = actions => state => {
	console.log('Counter nap');

	if (state.count > 12) {
		actions.resetCount();
	}
};
