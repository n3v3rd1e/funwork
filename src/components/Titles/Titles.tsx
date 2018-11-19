import TitleComponent from '@components/Title/Title';
import Snabbdom from 'snabbdom-pragma';
Snabbdom;

import './Titles.less';

const Titles = actions => state => {
	const Title = TitleComponent({ setTitle: actions.setTitle });
	return (
		<div className="titles">
			<Title title={state.title}>Im the first child</Title>
			<Title title={state.title}>Im the second child</Title>
		</div>
	);
};

export default Titles;
