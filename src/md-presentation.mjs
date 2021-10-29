import marked from 'https://cdn.jsdelivr.net/npm/marked@3.0.8/lib/marked.esm.js'
import syncAttribute from './helpers/sync-attribute.mjs'
import invokeOnChangeAttribute from './helpers/invoke-on-change-attribute.mjs'

const renderer = {
  heading (text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    const sectionStart = level <= 2 ? '<section class="slide">' : ''
    const prevSectionClose = level === 2 ? '</section>' : ''
    const heading = /* html */ `
      <h${level}>
        <a name="${escapedText}" class="anchor" href="#${escapedText}">
          <span class="header-link"></span>
        </a>
        ${text}
      </h${level}>
    `
    return `${prevSectionClose}${sectionStart}${heading}`
  }
}

marked.use({ renderer })

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
    const html = marked.parse(markdown) + '</section>'
    this._slides.innerHTML = html
  }
}

customElements.define('md-presentation', MdPresentation)
