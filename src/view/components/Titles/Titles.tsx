import Title from '@components/Title/Title';
import { useState } from '@framework/modules/statefulComponent';
import Snabbdom from 'snabbdom-jsx';
import './Titles.less';
import { createComponent } from '@/index';
Snabbdom;

const Titles = createComponent(({ key }) => {
	const { state } = Titles;
	const [isCheck, setIsCheck] = useState(key)(false);
	const toggleCheck = () => setIsCheck(!isCheck);

	return (
		<div className="titles">
			<input type="checkbox" value={isCheck} on={{ click: toggleCheck }} />
			Toggle check
			{isCheck ? (
				<Title key="title1" title={state.title}>
					Im the first child
				</Title>
			) : (
				''
			)}
			<Title key="title2" title={state.title}>
				Im the second child
			</Title>
		</div>
	);
});

export default Titles;
