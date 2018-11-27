import flyd from 'flyd';
import { prepareState } from './utils';
import { useState } from './modules/statefulComponent';

export const rerender = flyd.stream();
export { useState };

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
