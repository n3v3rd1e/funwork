import flyd from 'flyd';
import { prepareState } from './utils';
import createRouter from './modules/router';

export const rerender = flyd.stream();
// export const initRouter = router => {};

// export const prepareApp = (SAM, patch) => {
// 	const present = flyd.stream();
// 	const actions = SAM.actions(present);
// 	const model = flyd.scan(SAM.acceptor, SAM.model, present);
// 	const state = flyd.map(prepareState(SAM.state), model);

// 	flyd.on(SAM.nap(actions), state);

// 	const { routerView, initRouting } = createRouter(SAM.router);
// 	console.log('routerView', routerView);

// 	const createComponent = component => {
// 		Object.defineProperty(component, 'state', {
// 			enumerable: true,
// 			configurable: true,
// 			get: () => state()
// 		});

// 		Object.defineProperty(component, 'RouterView', {
// 			enumerable: true,
// 			configurable: true,
// 			get: () => routerView()
// 		});
// 		component.actions = actions;
// 		return component;
// 	};

// 	return {
// 		createComponent,
// 		mount: selector => rootComponent => {
// 			const rootNode = document.querySelector(selector);
// 			initRouting();

// 			const view = flyd.immediate(
// 				flyd.combine(
// 					(rerender, state) => {
// 						return rootComponent();
// 					},
// 					[rerender, state]
// 				)
// 			);

// 			flyd.scan(
// 				(acc, val) => {
// 					return patch(acc, val);
// 				},
// 				rootNode,
// 				view
// 			);
// 		}
// 	};
// };

export default class Funwork {
	present;
	actions;
	model;
	state;
	patch;
	createComponent;
	mount;

	constructor(SAM, patch) {
		this.patch = patch;
		this.present = flyd.stream();
		this.actions = SAM.actions(this.present);
		this.model = flyd.scan(SAM.acceptor, SAM.model, this.present);
		this.state = flyd.map(prepareState(SAM.state), this.model);

		this.createComponent = this._createComponent.bind(this);
		this.mount = this._mount.bind(this);

		flyd.on(SAM.nap(this.actions), this.state);
		flyd.on(SAM.router, this.state);
	}

	_createComponent(component) {
		Object.defineProperty(component, 'state', {
			enumerable: true,
			configurable: true,
			get: () => this.state()
		});
		component.actions = this.actions;
		return component;
	}

	_mount(selector, rootComponent) {
		const rootNode = document.querySelector(selector);
		const view = flyd.immediate(
			flyd.combine(
				(rerender, state) => {
					return rootComponent();
				},
				[rerender, this.state]
			)
		);

		flyd.scan(
			(acc, val) => {
				return this.patch(acc, val);
			},
			rootNode,
			view
		);
	}
}
