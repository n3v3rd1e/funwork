# funwork
Funwork is a framework for creating web applications usgin the [SAM pattern](http://sam.js.org)

to install run either
``` bash
yarn add funwork-js
```
 or
 
 ``` bash
npm install --save funwork-js
```

## How it works

The SAM pattern consists of a few decoupled parts, in this implementation they are:

* [Model](#model)
* [Acceptor](#acceptor)
* [Router](#router)
* [State](#state)
* [NAP](#nap)
* [Actions](#actions)
* [View](#view)

## Model

Model just holds your data, it should look something like this

``` js
const model = {
  ...someModuleModel,
  someList: [],
  title: 'I am initial title',
  randomValue: 42
};
```

where someModuleModel is just another model object

## Acceptor

It works like reducer, you create an acceptor function, which receives model as first and proposal from action as second argument
``` js
// reducer object, where every key is a action type name(I find it better and more composable, than using switch case )
const acceptorReducer = {
  ...someModuleReducer,
  addToSomeList,
  setTitle,
  setRandomValue,
  default: (model, payload) => {
    console.error('Action type ', payload.type, 'has no handler');
  }
};

// acceptor function, that is injected to the framework
const acceptor = (model, proposal) => {
  const acceptorType = acceptorReducer[proposal.type];
  if (acceptorType) {
    acceptorType(model, proposal.payload);
  } else {
    acceptorReducer.default(model, proposal);
  }
  return model;
};
```

## Router

Router is just a reflection of a part of the model, that should appear in the URL and on the initial page load change the defualt properties of the model

``` js
const router = model => {
  const { history, location } = window;
  const query = {
    moduleValue: model.someModuleValue,
    someList: model.someList,
    title: model.title,
  };
	
  history.pushState(
    null,
    page,
    `/${page}?${qs.stringify(query)}`
  );

  const _query = qs.parse(location.search);
  
  return {
    ..._query,
  };
};
```

## State

Model transformation for the view layer to be used, basically View-Model layer

``` js
const state = {
  ...someModuleState,
  someList: model => model.someList,
  title: model => model.title,
  randomValue: model => model.randomValue
}
```

## NAP

It stands for Next-Action-Predicate and serves for additional necessary changes, of the model

``` js
// imagine someone sets title to say Fuck off
const nap = actions => computedState => {
  if (containsBadWord(computedState.title)) {
    actions.setTitle(censored(computedState.title)) // F**ck off
  }
};
```

## Actions
More or less straightforward, just specifies what should be done with the model.

``` js
const acitons = present => ({
  ...someModuleActions(present),
  addToSomeList: value => present({ type: 'addToSomeList', payload: value }),
  setTitle: newTitle => present({ type: 'setTitle', payload: newTitle }),
  increaseRandomValue: byNumber => present({ type: 'increaseRandomValue', payload: byNumber || 1 }),
})
```

## View

Funwork js is liberal in the usage of the view layer, only requirement is, that components are functions.
If we want to use it with React for example, it would look like this:

``` js
import { render } from 'react-dom';

// function which handles rerendering has its argument in different order as React's render function
const patch = (rootNode, vNode) => {
  return render(vNode, rootNode).parentNode;
};
```

## Main file

In your main/index file, it would look like this

``` js
// imports
import Funwork from 'funwork-js';
import { render } from 'react-dom';
import actions from './actions';
import { acceptor, model, router } from './model';
import { nap, state } from './state';

// init
const funwork = new Funwork(
  {
    model,
    acceptor,
    state,
    actions,
    nap,
    router
  },
  patch
);

export const { createComponent } = funwork

// mount method renders component to the real DOM, but needs to be called after funwork initialization
// due to the usage of the createComponent function in the component themselves
import('./App').then(App => {
  funwork.mount('#app', App.default);
});

// App.jsx
import { createComponent } from './index';
import React from 'react';

const App = createComponent(
  () => {
    return (
      <div>
        This is the title {App.title}
        <button onClick={App.setTitle('Hello World')} >
          Change title to 'Hello World'
        </button>
      </div>
    );
  },
  {
    actions: ['setTitle'],
    state: ['title']
  }
);

export default App;
```




