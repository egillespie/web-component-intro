import marked from 'https://cdn.jsdelivr.net/npm/marked@3.0.8/lib/marked.esm.js'
import syncAttribute from './helpers/sync-attribute.mjs'
import invokeOnChangeAttribute from './helpers/invoke-on-change-attribute.mjs'

console.log(marked)

const html = /* html */ `
  <div id="slides"></div>
`

export default class MdPresentation extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
    this._slides = this.shadowRoot.getElementById('slides')
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
    const markdown = await response.text()
    this._slides.innerHTML = marked.parse(markdown)
  }
}

customElements.define('md-presentation', MdPresentation)
