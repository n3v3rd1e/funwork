import Snabbdom from 'snabbdom-jsx';
Snabbdom;

const Counter = ({ actions, ...state }) => {
	return (
		<div className="counter">
			<div className="count">The current count is {state.count}</div>
			<div className="buttons">
				<button on={{ click: () => actions.increaseCount(state.count) }}>
					Increase count
				</button>
				<button on={{ click: () => actions.decreaseCount(state.count) }}>
					Decrease count
				</button>
				<button on={{ click: actions.resetCount }}>Reset count</button>
			</div>
		</div>
	);
};

export default Counter;
