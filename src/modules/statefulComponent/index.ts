import { rerender } from '@/index';

const _state = {};
export const useState = key => initialValue => {
	if (!_state.hasOwnProperty(key)) {
		_state[key] = initialValue;

		_state[`set${key}`] = val => {
			_state[key] = val;
			rerender(!rerender());
		};

		_state[`del${key}`] = () => {
			delete _state[key];
			delete _state[`set${key}`];
			delete _state[`del${key}`];
		};
	}

	return [_state[key], _state[`set${key}`], _state[`del${key}`]];
};
