import { useState } from '@framework/modules/statefulComponent';
import Snabbdom from 'snabbdom-jsx';
import './Title.less';
Snabbdom;

const Title = ({ actions, key, ...state }, children) => {
	let [subtitle, setSubtitle, delSubtitle] = useState(key)('im subtitle');
	let [color, setColor, delColor] = useState(`${key}-color`)('red');
	const handleDestroy = () => {
		delSubtitle();
		delColor();
	}

	const handleSubtitleChange = e => {
		setSubtitle(e.target.value);
	};
	const handleColorChange = e => {
		setColor(e.target.value || 'purple');
	};


	return (
		<div className="title" hook-destroy={handleDestroy}>
			<div>
				<div>
					<div>This is my all mighty title from common state</div>
					<div>{subtitle || 'failed'}</div>
					<br />
					<h1 style-color={color}>{state.title}</h1>
					<input type="text" on-input={handleColorChange} />
				</div>
				<div>
					<input
						type="text"
						on={{ input: e => actions.setTitle(e.target.value) }}
					/>
				</div>
			</div>
			<div>
				<div>
					<span>This is my components title</span>
					<br />
					<h1>:(</h1>
				</div>
				<div>
					<input
						type="text"
						on={{
							input: handleSubtitleChange
						}}
					/>
				</div>
			</div>
			<div>
				Im just lonely child
				<br />
				{children}
			</div>
		</div>
	);
};

export default Title;
