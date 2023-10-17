import { Store } from './Store.js';
import { Controller } from './Controller.js';
import { View } from './View.js';

export const App = (parent, content) => {
  const store = new Store();
  const controller = new Controller(store);
  const view = new View({ parent, controller, store, content })
  
  controller.init(initialData => view.init(initialData));
};
