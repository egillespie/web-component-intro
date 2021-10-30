import marked from 'https://cdn.jsdelivr.net/npm/marked@3.0.8/lib/marked.esm.js'
import {
  syncAttribute,
  invokeOnChangeAttribute,
  splitMarkdownSections
} from './helpers.mjs'

export default class MdPresentation extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* html */ `
      <main id="presentation" part="presentation"></main>
    `
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
    const mdSlides = splitMarkdownSections(markdown)
      .map((md, index) => /* html */ `
        <md-slide index="${index}">
          <div slot="content">
            ${marked.parse(md)}
          </div>
        </md-slide>
      `)
      .join('')
    this.shadowRoot.firstElementChild.innerHTML = mdSlides
  }
}

customElements.define('md-presentation', MdPresentation)
