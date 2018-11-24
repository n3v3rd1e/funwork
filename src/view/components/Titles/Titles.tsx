import Title from '@components/Title/Title';
import { useState } from '@framework/modules/statefulComponent';
import Snabbdom from 'snabbdom-jsx';
import './Titles.less';
Snabbdom;

const Titles = ({ actions, key, ...state }) => {
	const [isCheck, setIsCheck] = useState(key)(false);
	const toggleCheck = () => setIsCheck(!isCheck);
	const setTitle = actions.setTitle;

	return (
		<div className="titles">
			<input type="checkbox" value={isCheck} on={{ click: toggleCheck }} />
			Toggle check
			{isCheck ? (
				<Title key="title1" actions={{ setTitle }} title={state.title}>
					Im the first child
				</Title>
			): ''}
			<Title key="title2" actions={{ setTitle }} title={state.title}>
				Im the second child
			</Title>
		</div>
	);
};

export default Titles;
