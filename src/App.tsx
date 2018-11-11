import Snabbdom from 'snabbdom-pragma';
Snabbdom;

import Button from './components/reusable/Button/Button';

export default function App() {
	return <div>This is basic shit app. <Button text={'hello'} /></div>;
}