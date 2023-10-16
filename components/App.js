import { Element } from "./Element.js";
import { Textarea  } from './textarea/textarea.js';
import { Store } from './Store.js';
import { Controller } from './Controller.js';

export const App = (parent, content) => {
  const store = new Store();
  const controller = new Controller(store);
  
  const title = new Element({ parent, tagName: 'h1', content: content.title });

  const textarea = new Textarea(parent, controller.changeTextareaText);
  store.onChangeTextareaText.add(textareaText => textarea.update(textareaText));
  
  controller.init(content => textarea.update(content));
};
