import O from 'patchinko/immutable';

export const model = {
	count: 6
};

export const acceptor = (model, present) => {
	console.log('Counter acceptor');
	return O(model, present);
}