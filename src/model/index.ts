import { acceptor as CounterAcceptor, model as CounterModel } from '@/modules/counter/model';
import O from 'patchinko/immutable';


export const model = {
	count: 6,
	title: 'UUU Im the initial title, muhahaha',
	...CounterModel
};

const acceptorModules = [
	CounterAcceptor
]

export const acceptor = (model, present) => {
	console.log('acceptor');
	console.log('model', model);
	console.log('present', present);

	return acceptorModules.reduce(O, O(model, present));
};
