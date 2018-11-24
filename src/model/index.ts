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

export const acceptor = (model, proposal) => {
	return acceptorModules.reduce(O, O(model, proposal));
};
