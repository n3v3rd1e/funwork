import { createComponent } from '@/index';
import Snabbdom from 'snabbdom-jsx';
Snabbdom;

const Home = createComponent(props => {
	return (
		<div component="home">
			<span>This is Home component</span>
			<span>{props.text}</span>
		</div>
	);
});

export default Home;
