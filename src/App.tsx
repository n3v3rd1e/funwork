import Snabbdom from 'snabbdom-pragma';
Snabbdom;
import Button from '@reusable/Button/Button';
import { add } from '@framework/modules/fok';

const number = add(4)(3);

export default function App() {
	return (
		<div id="app">
			This is basic shit app. {number}
			<Button text={'hello'} />
		</div>
	);
}
