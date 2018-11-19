import Snabbdom from 'snabbdom-pragma';
import TitlesComponent from '@components/Titles/Titles';
import CounterComponent from '@components/Counter/Counter';
Snabbdom;

const App = actions => state => {
	const Titles = TitlesComponent({ setTitle: actions.setTitle });
	const Counter = CounterComponent(actions);

	return (
		<div id="app">
			<Counter count={state.count} />
			<br/>
			<div className="titles">
				<Titles title={state.title} />
			</div>
		</div>
	);
}

export default App;
