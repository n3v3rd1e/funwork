import flyd from 'flyd';
import O from 'patchinko/immutable';
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
	createAcceptor;
	mount;

	constructor(SAM, patch) {
		this.patch = patch;
		this.present = flyd.stream();
		this.actions = SAM.actions(this.present);
		const model = O(SAM.model, SAM.router(SAM.model));
		this.model = flyd.scan(SAM.acceptor, model, this.present);
		this.state = flyd.map(prepareState(SAM.state), this.model);

		this.createComponent = this._createComponent.bind(this);
		this.mount = this._mount.bind(this);

		flyd.on(SAM.nap(this.actions), this.state);
		flyd.on(SAM.router, this.model);
	}

	// Fix somehow, to not have a need of including first argument
	_createComponent(
		component,
		{ actions = [], state = [] } = { actions: [], state: [] }
	) {
		for (const action of actions) {
			component[action] = this.actions[action];
		}
		for (const item of state) {
			Object.defineProperty(component, item, {
				enumerable: true,
				configurable: true,
				get: () => this.state()[item]
			});
		}
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

		flyd.scan(this.patch, rootNode, view);
	}
}
