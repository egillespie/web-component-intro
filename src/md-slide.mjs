import {
  syncAttribute,
  invokeOnChangeAttribute
} from './helpers.mjs'

const html = /* html */ `
  <section>
    <slot></slot>
  </section>
`

export default class MdSlide extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
  }

  get index () {
    return this.getAttribute('index')
  }

  set index (value) {
    syncAttribute(this, 'index', value)
  }

  static get observedAttributes () {
    return ['index']
  }

  attributeChangedCallback () {
    invokeOnChangeAttribute(this, ...arguments)
  }

  onChangeIndex (newIndex) {
    this.shadowRoot.querySelector('section').id = `slide-${newIndex}`
  }
}

customElements.define('md-slide', MdSlide)
