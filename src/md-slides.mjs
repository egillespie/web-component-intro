import syncAttribute from './helpers/sync-attribute.mjs'
import invokeOnChangeAttribute from './helpers/invoke-on-change-attribute.mjs'

const html = /* html */ `
  <pre><code></code></pre>
`

export default class MdSlides extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
    this._code = this.shadowRoot.querySelector('code')
  }

  connectedCallback () {
  }

  get src () {
    return this.getAttribute('src')
  }

  set src (value) {
    syncAttribute(this, 'src', value)
  }

  static get observedAttributes () {
    return ['src']
  }

  attributeChangedCallback () {
    invokeOnChangeAttribute(this, ...arguments)
  }

  async onChangeSrc (newSrc) {
    const response = await fetch(newSrc)
    const content = await response.text()
    this._code.textContent = content
  }
}

customElements.define('md-slides', MdSlides)
