// import { prepareApp } from '@framework/index';
import Funwork from '@framework/index';
import { init } from 'snabbdom';
import classMode from 'snabbdom/es/modules/class';
import eventlisteners from 'snabbdom/es/modules/eventlisteners';
import props from 'snabbdom/es/modules/props';
import style from 'snabbdom/es/modules/style';
import actions from './actions';
import { acceptor, model } from './model';
import { nap, state, router } from './state';
import ReactDOM from 'react-dom';

const patch = init([classMode, props, style, eventlisteners]);

const reactPatch = (rootNode, vNode) => {
	return ReactDOM.render(vNode, rootNode).parentNode;
};

const funwork = new Funwork(
	{
		model,
		acceptor,
		state,
		actions,
		nap,
		router,
	},
	reactPatch
	//patch
);

export const { createComponent } = funwork;
import('@/App').then(App => funwork.mount('#app', App.default));

if (module.hot) {
	module.hot.accept('@/App', App => {
		funwork.mount('#app', App);
	});
}

// const preparedApp = prepareApp(
// 	{
// 		model,
// 		acceptor,
// 		state,
// 		actions,
// 		nap,
// 	},
// 	patch
// );

// export const { createComponent } = preparedApp;
// import('@/App').then(App => preparedApp.mount('#app')(App.default));

// if (module.hot) {
// 	module.hot.accept('@/App', App => {
// 		preparedApp.mount('#app')(App);
// 	});
// }
