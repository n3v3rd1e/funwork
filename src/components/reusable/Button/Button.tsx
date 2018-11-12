import Snabbdom from 'snabbdom-pragma';
Snabbdom;
import './Button.less';

export default function Button({ text }) {
	return <button on={{click: () => console.log('clicked')}} >{text} fok</button>;
}
