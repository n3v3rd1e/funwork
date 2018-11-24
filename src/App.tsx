import Snabbdom from 'snabbdom-jsx';
import Titles from '@components/Titles/Titles';
import Counter from '@components/Counter/Counter';
Snabbdom;

const App = ({ actions, ...state }) => {
	const setTitle = actions.setTitle;

	return (
		<div id="app">
			<Counter actions={actions} count={state.count} />
			<br/>
			<div className="titles">
				<Titles key="titles" actions={{ setTitle }} title={state.title} />
			</div>
		</div>
	);
}

export default App;
