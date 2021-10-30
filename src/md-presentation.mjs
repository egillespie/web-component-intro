import marked from 'https://cdn.jsdelivr.net/npm/marked@3.0.8/lib/marked.esm.js'
import {
  syncAttribute,
  invokeOnChangeAttribute,
  splitMarkdownSections
} from './helpers.mjs'

const html = /* html */ `
  <style>
    main {
      margin: 0;
      padding: 2rem;
      position: absolute;
      top: 0;
      bottom: 0;
    }

    h1, h2 {
      font-family: var(--ff-sans);
      text-shadow: #00ffff -2px 0 0, #ff00ff 2px 0 0;
    }

    h1 {
      font-size: 4.5rem;
      line-height: 1.4;
    }

    h2 {
      font-size: 3rem;
      border-bottom: 4px double var(--fg-color);
    }

    img {
      display: block;
      max-width: 100%;
      margin: auto;
      filter: drop-shadow(0 0 16px black)
    }

    a {
      color: var(--link-color);
      text-decoration: none;
      background-color: transparent;
    }

    a:hover {
      text-decoration: underline;
    }

    p > code {
      background-color: #222;
      border-radius: 4px;
      padding: 4px 8px;
    }

    .slide {
      padding: 0;
      border: 1px solid var(--bg-color);
      position: relative;
      height: 100%;
      font-size: 1.5rem;
    }

    .slide:not(.active) {
      display: none;
    }

    .slide[data-index="0"] {
      text-align: center;
    }

    .slide[data-index="0"] strong {
      font-size: 2.5rem;
    }

    .slide[data-index="0"] p {
      display: inline-block;
      margin: 2rem;
    }
  </style>
  <main id="presentation"></main>
`

export default class MdPresentation extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
  }

  connectedCallback () {
    window.addEventListener('keydown', this)
  }

  disconnectedCallback () {
    window.removeEventListener('keydown', this)
  }

  handleEvent (event) {
    if (event.type === 'keydown') {
      if (event.code === 'ArrowLeft') {
        this.previousSlide()
      } else if (event.code === 'ArrowRight') {
        this.nextSlide()
      }
    }
  }

  previousSlide () {
    const slideIndex = parseInt(this.activeSlide)
    if (slideIndex > 0) {
      this.activeSlide = slideIndex - 1
    }
  }

  nextSlide () {
    const slideIndex = parseInt(this.activeSlide)
    const slideCount = this.shadowRoot.getElementById('presentation').childElementCount
    if (slideIndex < slideCount - 1) {
      this.activeSlide = slideIndex + 1
    }
  }

  get src () {
    return this.getAttribute('src')
  }

  set src (value) {
    syncAttribute(this, 'src', value)
  }

  get activeSlide () {
    return this.getAttribute('active-slide')
  }

  set activeSlide (value) {
    syncAttribute(this, 'active-slide', value)
  }

  static get observedAttributes () {
    return ['src', 'active-slide']
  }

  attributeChangedCallback () {
    invokeOnChangeAttribute(this, ...arguments)
  }

  async onChangeSrc (newSrc) {
    const response = await fetch(newSrc)
    const markdown = await response.text()
    const slides = splitMarkdownSections(markdown)
      .map((md, index) => /* html */ `
        <section id="slide-${index}" data-index="${index}" class="slide">
          ${marked.parse(md)}
        </section>
      `)
      .join('')
    const presentation = this.shadowRoot.getElementById('presentation')
    presentation.innerHTML = slides
    if (presentation.childElementCount > 0) {
      this.activeSlide = 0
    }
  }

  onChangeActiveSlide (newIndex, oldIndex) {
    const oldSlide = this.shadowRoot.querySelector(`[data-index="${oldIndex}"]`)
    if (oldSlide) {
      oldSlide.classList.remove('active')
    }
    const newSlide = this.shadowRoot.querySelector(`[data-index="${newIndex}"]`)
    if (newSlide) {
      newSlide.classList.add('active')
    }
  }
}

customElements.define('md-presentation', MdPresentation)
