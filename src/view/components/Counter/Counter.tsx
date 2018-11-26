import { createComponent } from '@/index';
import React from 'react';
React;
import Snabbdom from 'snabbdom-jsx';
Snabbdom;

const Counter = createComponent(props => {
	const { actions, state } = Counter;

	return (
		<div className="counter">
			<div className="count">The current count is {state.count}</div>
			<div className="buttons">
				<button onClick={() => actions.increaseCount(state.count)}>
					Increase count
				</button>
				<button onClick={() => actions.decreaseCount(state.count)}>
					Decrease count
				</button>
				<button onClick={actions.resetCount}>Reset count</button>
			</div>
		</div>
	);
});

export default Counter;
