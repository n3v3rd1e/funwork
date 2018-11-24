import flyd from 'flyd';

let change = true;
export const rerender = flyd.stream(change);

const _state = {};
export const useState = key => initialValue => {
	if (!_state.hasOwnProperty(key)) {
		_state[key] = initialValue;

		_state[`set${key}`] = val => {
			_state[key] = val;
			change = !change;
			rerender(change);
		};

		_state[`del${key}`] = () => {
			delete _state[key];
			delete _state[`set${key}`];
			delete _state[`del${key}`];
		};
	}

	return [_state[key], _state[`set${key}`], _state[`del${key}`]];
};
