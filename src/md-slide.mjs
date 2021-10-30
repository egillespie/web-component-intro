import syncAttribute from './helpers/sync-attribute.mjs'
import invokeOnChangeAttribute from './helpers/invoke-on-change-attribute.mjs'

const html = /* html */ `
  <section part="slide">
    <slot name="content"></slot>
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
    this.shadowRoot.firstElementChild.id = `slide-${newIndex}`
  }
}

customElements.define('md-slide', MdSlide)
