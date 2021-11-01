# Web Components by Example

**By Erik Gillespie**

An introduction to web components using lots of examples. Even the slides are written with web components! (so meta)

To experience this presention, visit:

[egillespie.github.io/web-component-intro](https://egillespie.github.io/web-component-intro)

## About the presenter

- Erik Gillespie

- My pronouns are he/him or they/them

- `erik.gillespie@gmail.com`

- I help out at Lansing Codes and Lansing Makers Network

- I teach web dev at MSU and homeschool my kiddo

- I love board games and a good book

## Helpful skills to know

I think it's easier to learn web components if you know a bit of:

- HTML

- Basic JavaScript syntax

- Accessing the DOM with JavaScript

- JavaScript classes

- A little CSS

## Web components defined

Custom HTML elements powered by JavaScript and available in all modern web browsers.

- Declare a class that extends `HTMLElement`

- Write a constructor with no arguments and call `super()`

- Use `customElements.define('tag-name', ClassName)` to register your web component

- Tag names must contain a hyphen (`-`)

- You must have both open and close tags: `<my-tag></my-tag>`

## x. Show the page title

Awwww, our first custom tag!

https://jsfiddle.net/elgillespie/460mprwo/

## Introducing the Shadow DOM

Custom elements can make use of their own DOM, known as the Shadow DOM, to protect their styles and structure from outside influence. Kinda.

- Some styles can still be inherited, but Shadow DOM elements do not have direct access to external style classes (and vice versa).

- External JavaScript also does not have direct access to elements in a Shadow DOM using the usual DOM API such as `getElementById`.

- With the Shadow DOM, HTML `id` attributes in a component are not considered duplicates across your whole document.

- Use `this.shadowRoot` instead of `this` or `document` to use common browser APIs (such as `querySelector`) within your component.

## x. Page title in a Shadow DOM

Notice how page styles are not applied to elements in the Shadow DOM.

https://jsfiddle.net/elgillespie/hoqc0g3p/

## Using attributes

Use `this.getAttribute` to lookup the value of an attribute on your component.

## x. A radio input with a label

https://jsfiddle.net/elgillespie/7kspq9md/

## Handling attribute changes

- Define a function as `static get observedAttributes` that returns an array of attribute names you want to watch.

- Make an `attributeChangedCallback (name, oldValue, newValue)` function that will be called each time an attribute returned by `observedAttributes` is changed.

- Write some logic to identify which attribute changed, then update the state of your component accordingly.

- Minimize the number of changes you make (i.e. avoid redrawing the entire component) because causing lots of changes can cause flickers and noise in screen readers!

## x. Responding to attribute changes

https://jsfiddle.net/elgillespie/ed4scw1n/

## Knowing when your component is (or isn't) in a DOM

Special functions exist that allow your components to respond to being placed in or removed from a DOM.

- Define a `connectedCallback ()` function if your component needs to run some code when it is added to the page (or any DOM).

- Define a `disconnectedCallback ()` function if your component needs to run some (cleanup) code when it is removed from the page (or any DOM).

- You may need this when your element needs to communicate with _other_ elements on the page, such as a `window` event listener to capture key presses or when broadcasting custom events.

- When a custom element is removed from a DOM, the browser will automatically remove its own and children event listeners so you don't usually need to manage this on your own!

## x. Web components looking to connect

https://jsfiddle.net/elgillespie/uj7kdph9/

## Externalizing content with templates

- The `<template>` tag allows you to put unrendered content into your HTML file that you can then lookup and apply to your web components.

- The `<template>` element has a `.content` property that contains the document fragment with all of the content of the template.

- Use `template.content.cloneNode(true)` to copy the content into your Shadow DOM.

## x. Separate HTML and JavaScript

https://jsfiddle.net/elgillespie/y3dtcr16/

## Named content using slots

- The `<slot name="..."></slot>` tag goes in your web component's HTML template.

- Use the `slot="..."` attribute on the inner HTML of your custom element.

- The `<slot name="..."></slot` tag will automatically be substituted with `slot="..."` element and all its children.

- Putting content between the `<slot>` and `</slot>` tags will provide default content for that slot.

- If a slot's content changes, the browser will automatically apply those changes to your web component and rerender it.

## x. Automatically set content with slots

https://jsfiddle.net/elgillespie/qxemtbck/

## Styling a web component

- Put a `<style></style>` tag at the top of your component's template

- Avoid linking to an external stylesheet (it can cause flickering)

- Use a Shadow DOM so your styles only affect your component

- Use the `:host` selector to apply default styles like `display: block`

## x. A stylish page title component

https://jsfiddle.net/elgillespie/7szafo8c/

## Writing access methods for web components

Writing getters, setters, and other access functions for a web component will
make it simpler to use in JavaScript.

- Use `get <attribute> ()` and `this.getAttribute('<attribute>')` together to
  read attribute values programmatically.

- Use `set <attribute> (value)`, `this.setAttribute('<attribute>', value)`, and
  `this.removeAttribute('<attribute>')` to modify attributes in JavaScript.

- Make sure all data needed by your web component can be set from both
  JavaScript _and_ HTML!

- Writing named methods for web components open up new ways to use components
  and makes them easier to test.

## x. Accessing features of a web component with JavaScript

https://jsfiddle.net/elgillespie/58rL7vsu/

1. Use `gameEntry.name` to get or set the `'name'` attribute

2. `<game-entry name="..."></game-entry>` works too

3. Use `gameEntry.rename()` to trigger the rename functionality

## Making parts of web components styleable

It is possible to allow external stylesheets to style web components, even if
they are in a Shadow DOM!

- Set the `part` attribute on elements in the web component to expose them to
  external styling.

- The `part` attribute is like the `class` attribute: you can add one or more
  part names separated by spaces.

- The `element-name::part(partName)` pseudo-selector is used to style exposed
  parts of a web component in an external stylesheet.

## x. Styling parts of a web component

https://jsfiddle.net/elgillespie/7roqxfze/

1. See how the values in the `part` attribute are used in HTML

2. Each "part" can be selected and styled in external CSS

## Loading web components for use

ES Modules are a standard and widely available feature of all modern
browsers. JavaScript files can be loaded from both HTML and other JS
files.

- Put each web component in a separate file with the `.mjs` extension.

- Use `export default` the `class` keyword when defining a web component.

- Use `import ClassName from 'classname.mjs'` to load a JavaScript file from
  another JavaScript file.

- Add `type="module"` to your `<script>` tags in HTML to load ES Module files.

## Exporting and importing a web component

https://egillespie.github.io/web-component-intro/examples/es-module/

![Web component as ES Module](screenshots/es-module.png)

## An improved code editor experience

Having all the JS, CSS, and HTML for a web component in a single file is
sometimes preferred, but without syntax highlighting it's not a great
experience.

- **VS Code:** Install the `es6-string-html` extension.

- **Atom:**: Run `apm install language-babel` in a terminal.

- Add `/* html */` before your template string literal to enable syntax
  highlighting.

- Shout out to Benjamin Asher for sharing this! 🤘

## x. Highlight those templates

![Syntax highlighted string literals](screenshots/es6-highlighting.png)

## Code and questions

- [Presentation source code](https://github.com/egillespie/web-component-intro)

- [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

- [ES Modules on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

- Questions?
