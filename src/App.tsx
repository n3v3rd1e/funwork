import { createComponent } from '@/index';
import Counter from '@components/Counter/Counter';
import Titles from '@components/Titles/Titles';
import Snabbdom from 'snabbdom-jsx';

const App = createComponent(() => {
	console.log(3);
	
	return (
		<div id="app">
			<div>
				<a on-click={() => App.actions.goTo('home')}>Go to Home</a>
				<a on-click={() => App.actions.goTo('fok')}>Go to Fok</a>
			</div>
			<div>
				{(() => {
					if (App.state.route === 'home') {
						return <Counter />;
					}
					return <div>Not home Bitch</div>
				})()}
			</div>
			{/* <br/>
			<div className="titles">
				<Titles key="titles" />
			</div> */}
		</div>
	);
});

export default App;
