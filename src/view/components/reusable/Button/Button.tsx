import Snabbdom from 'snabbdom-jsx';
Snabbdom
import './Button.less';

export default function Button({ text }) {
	return <button on={{click: () => console.log('clicked')}} >{text} fok</button>;
}
