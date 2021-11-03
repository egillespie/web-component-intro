# Web Components by Example

**By Erik Gillespie**

An introduction to web components using lots of examples. Even the slides are written with web components! (so meta)

To experience this presention, visit:

[egillespie.github.io/web-component-intro](https://egillespie.github.io/web-component-intro)

## About the presenter

- Erik Gillespie

- My pronouns are he/him or they/them

- Email me at [`erik.gillespie@gmail.com`](mailto:erik.gillespie@gmail.com)

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

A browser API that allows custom HTML elements to be made with JavaScript.

Here's how:

- Make a `class` that extends `HTMLElement`

- Write a `constructor()` and call `super()`

- Set `this.innerHTML` to whatever you want

- Call `customElements.define('tag-name', ClassName)` below your class

- Tag names must contain a `-` hyphen

- Use open and close tags: `<my-tag></my-tag>`

## x. Show the page title

Awwww, our first custom tag! 😍

https://jsfiddle.net/elgillespie/460mprwo/

## The Shadow DOM

Custom elements can have their own DOM (the Shadow DOM) to protect their CSS and HTML from *most* outside influences.

Shadow DOMs:

- Create one with `this.attachShadow({mode: 'open'})` in the constructor

- Access it with `this.shadowRoot`

- Inherit styles from `:root`, `html`, and `body`

- Can't affect external elements

- Ignored by external JavaScript functions like `getElementById`

- Get their own set of unique HTML `id` attributes

## x. Page title in a Shadow DOM

Notice how page styles aren't applied to elements in the Shadow DOM.

https://jsfiddle.net/elgillespie/hoqc0g3p/

## Using attributes

- `this.getAttribute` reads the value of an attribute on your component

- `this.setAttribute` adds or modifies an attribute

- `this.removeAttribute` clears an attribute and its value

- Use these in your `class` or to manipulate components with JavaScript

## x. Radio input with a label

This doesn't work in a Shadow DOM because the `name` attribute couldn't be shared!

https://jsfiddle.net/elgillespie/7kspq9md/

## Handling attribute changes

- `static get observedAttributes ()` returns an array of attribute names to watch

- `attributeChangedCallback (name, oldValue, newValue)` is called each time an observed attribute is changed

- Use conditionals to identify which attribute changed, then update your component using the new value

- Minimize the DOM changes you make avoid flickering and screen reader noise

## x. Responding to attribute changes

Notice how `innerHTML` is not rewritten in `attributeChangedCallback`.

https://jsfiddle.net/elgillespie/ed4scw1n/

## Knowing when your component's in a DOM

- When a component is removed from a DOM, the browser automatically removes event listeners attached within the element

- `connectedCallback ()` is called when a component is added to the page (or any DOM)

- `disconnectedCallback ()` is called when a component is removed from the page (or any DOM)

- Use when an element needs to add an event listener to _another_ element on the page

## x. Web components looking to connect

https://jsfiddle.net/elgillespie/uj7kdph9/

## Externalizing content with templates

- The `<template>` tag can hold any HTML content you want to use to organize your component

- `<template>` and any content in it is not rendered on the page

- Use the `.content` property to access the template's content

- Use `template.content.cloneNode(true)` to copy the content into your Shadow DOM

## x. Separate HTML and JavaScript

https://jsfiddle.net/elgillespie/y3dtcr16/

## Named content using slots

- `<slot name="..."></slot>` tag goes in your web component's HTML template

- Use the `slot="..."` attribute on the inner HTML of your custom element

- The `<slot name="..."></slot` tag will be automatically replaced with the matching `slot="..."` element

- Content between the `<slot>` and `</slot>` tags will be used as the default content for that slot

- Changes to a slot's content will automatically sync with your component

## x. Synchronized slot content

https://jsfiddle.net/elgillespie/qxemtbck/

## Styling a web component

- Put a `<style></style>` tag at the top of your component's template

- Avoid linking to an external stylesheet (it can cause flickering)

- Use a Shadow DOM so your styles only affect your component

- Use the `:host` selector to set default styles like `display: block` to your custom element

## x. A stylish page title component

https://jsfiddle.net/elgillespie/7szafo8c/

## Access methods for web components

Write getters, setters, and other functions in your class to make it
simpler to use in JavaScript.

- `get <attribute> ()` and `this.getAttribute('<attribute>')` are useful for reading attribute values

- `set <attribute> (value)` and `this.setAttribute('<attribute>', value)` can be used to modify attributes

- If creating elements in JavaScript, write these functions for all attributes

- More class methods means more ways to use and test your components

## x. Using web components in JavaScript

`.name` and `.rename()` make the component nicer to
use in JavaScript.

https://jsfiddle.net/elgillespie/58rL7vsu/

## Making parts of web components styleable

There's a way to allow parts of a component to be styled with external CSS.

- Set the `part` attribute on elements in the web component to expose them to
  external styling

- The `part` attribute is like the `class` attribute: you can add one or more
  part names separated by spaces

- `my-tag::part(partName)` pseudo-selector can style
  parts of a web component from an external stylesheet

- Child elements can't be selected with `::part`

## x. Styling parts of a web component

https://jsfiddle.net/elgillespie/7roqxfze/

## Loading web components

- ES Modules are a standard, widely available feature of all modern
browsers

- JavaScript files can be loaded from HTML and other JS
files this way

- Put web components in their own files with the `.mjs` extension

- Put `export default` before the `class` keyword of the web component

- Use `import ClassName from 'classname.mjs'` to load modules from
  other JavaScript files

- Add `type="module"` to your `<script>` tags

## Exporting and importing a web component

https://egillespie.github.io/web-component-intro/examples/es-module/

![Web component as ES Module](screenshots/es-module.png)

## An improved code editor experience

Putting all the JS, CSS, and HTML for a web component in one file is
sometimes preferred, but no syntax highlighting of HTML and CSS isn't.

- **VS Code:** Install the `es6-string-html` extension

- **Atom:** Run `apm install language-babel` in a terminal

- Add `/* html */` before your template string to syntax highlight it

- Shout-out to Benjamin Asher for this tip!

## x. Highlight those templates

![Syntax highlighted string literals](screenshots/es6-highlighting.png)

## Questions and Answers

For more information, check out these links:

- [Presentation source code](https://github.com/egillespie/web-component-intro)

- [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

- [ES Modules on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
