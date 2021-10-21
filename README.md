# Web Components by Example

This is an introduction to web components using lots of examples. Even the and
even the slides are written with web components (I know, very meta).

To experience this presention, visit:

https://egillespie.github.io/web-component-intro

## Outline

### About the presenter

### Helpful skills to know

### Web components defined

An API in all popular browsers that lets you create custom elements.

### x. Show the page title

Nothing special, just a custom tag.

https://jsfiddle.net/elgillespie/460mprwo/

### Introducing the Shadow DOM

Custom elements can make use of their own DOM, known as the Shadow DOM, to protect their styles and structure from outside influence. Kinda.

- Some styles can still be inherited, but Shadow DOM elements do not have direct access to external style classes (and vice versa).

- External JavaScript also does not have direct access to elements in a Shadow DOM using the usual DOM API such as `getElementById`.

- With the Shadow DOM, HTML `id` attributes in a component are not considered duplicates across your whole document.

- Use `this.shadowRoot` instead of `this` or `document` to use common browser APIs (such as `querySelector`) within your component.

### x. Page title in a Shadow DOM

Notice how page styles are not applied to elements in the Shadow DOM.

https://jsfiddle.net/elgillespie/hoqc0g3p/24/

### Using attributes

Use `this.getAttribute` to lookup the value of an attribute on your component.

### x. A radio input with a label

https://jsfiddle.net/elgillespie/7kspq9md/

### Handling attribute changes

- Define a function as `static get observedAttributes` that returns an array of attribute names you want to watch.

- Make an `attributeChangedCallback (name, oldValue, newValue)` function that will be called each time an attribute returned by `observedAttributes` is changed.

- Write some logic to identify which attribute changed, then update the state of your component accordingly.

- Minimize the number of changes you make (i.e. avoid redrawing the entire component) because causing lots of changes can cause flickers and noise in screen readers!

### x. Responding to attribute changes

https://jsfiddle.net/elgillespie/ed4scw1n/

### Knowing when your component is (or isn't) in a DOM

Special functions exist that allow your components to respond to being placed in or removed from a DOM.

- Define a `connectedCallback ()` function if your component needs to run some code when it is added to the page (or any DOM).

- Define a `disconnectedCallback ()` function if your component needs to run some (cleanup) code when it is removed from the page (or any DOM).

- You may need this when your element needs to communicate with _other_ elements on the page, such as a `window` event listener to capture key presses or when broadcasting custom events.

- When a custom element is removed from a DOM, the browser will automatically remove its own and children event listeners so you don't usually need to manage this on your own!

### x. Web components looking to connect

https://jsfiddle.net/elgillespie/uj7kdph9/

### Externalizing content with templates

- The `<template>` tag allows you to put unrendered content into your HTML file that you can then lookup and apply to your web components.

- The `<template>` element has a `.content` property that contains the document fragment with all of the content of the template.

- Use `template.content.cloneNode(true)` to copy the content into your Shadow DOM.

### x. Separate HTML and JavaScript

https://jsfiddle.net/elgillespie/y3dtcr16/

### Named content using slots

- The `<slot name="..."></slot>` tag goes in your web component's HTML template.

- Use the `slot="..."` attribute on the inner HTML of your custom element.

- The `<slot name="..."></slot` tag will automatically be substituted with `slot="..."` element and all its children.

- Putting content between the `<slot>` and `</slot>` tags will provide default content for that slot.

- If a slot's content changes, the browser will automatically apply those changes to your web component and rerender it.

### x. Automatically set content with slots

https://jsfiddle.net/elgillespie/qxemtbck/
