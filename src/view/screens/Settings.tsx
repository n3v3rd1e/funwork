import { createComponent } from '@/index';
import Snabbdom from 'snabbdom-jsx';
Snabbdom;

const Settings = createComponent(props => {
	return (
		<div component="settings">
			<span>This is settings route</span>
			<span>{props.text}</span>
		</div>
	)
});

export default Settings;
