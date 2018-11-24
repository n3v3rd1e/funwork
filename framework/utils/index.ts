export const prepareState = state => model => {
	const result = {};
	for (const key in state) {
		Object.defineProperty(result, key, {
			configurable: true,
			enumerable: true,
			get() {
				return state[key](model);
			}
		})
	}
	return result;
}