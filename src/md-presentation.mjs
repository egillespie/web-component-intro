import marked from './marked.mjs'
import {
  syncAttribute,
  invokeOnChangeAttribute,
  splitMarkdownSections
} from './helpers.mjs'

const html = /* html */ `
  <style>
    :host {
      --text-shadow: #00ffff -2px 0 0, #ff00ff 2px 0 0;
    }

    main {
      overflow: hidden;
      margin: 0;
      padding: 2rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    h1, h2 {
      font-family: var(--ff-sans);
      text-shadow: var(--text-shadow);
    }

    h1 {
      font-size: 4.5rem;
      line-height: 1.4;
    }

    h2 {
      font-size: 3rem;
      border-bottom: 4px double var(--fg-color);
      padding-left: 1rem;
      margin-top: 1rem;
    }

    li {
      list-style-type: '⁖ ';
    }

    img {
      display: block;
      max-width: 100%;
      max-height: 70vh;
      margin: 0 auto;
      filter: drop-shadow(0 0 8px black)
    }

    iframe {
      display: block;
      width: 100%;
      max-width: 800px;
      height: 50vh;
      margin: 2rem auto 0;
      filter: drop-shadow(0 0 8px black)
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

    button.nav {
      border: none;
      background-color: transparent;
      color: var(--fg-color);
      cursor: pointer;
      font-size: 2rem;
      font-weight: bold;
      font-family: var(--ff-sans);
      text-shadow: var(--text-shadow);
      outline: none;
    }

    button.nav:hover {
      text-decoration: underline;
    }

    button.nav.off {
      cursor: not-allowed;
      opacity: 0.2;
    }

    button.nav.off:hover {
      text-decoration: none;
    }

    button.prev {
      position: fixed;
      bottom: 1rem;
      left: 1rem;
    }

    button.next {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
    }

    .slide {
      margin: auto;
      padding: 0;
      border: 1px solid var(--bg-color);
      position: relative;
      font-size: 1.5rem;
      animation-duration: .5s;
    }

    .slide:not(.active) {
      animation-name: inactivate;
    }

    .slide.active {
      animation-name: activate;
    }

    .slide[data-index="0"] {
      text-align: center;
    }

    .slide[data-index="0"] strong {
      font-size: 2.5rem;
    }

    .slide[data-index="0"] p {
      display: block;
      margin: 2rem;
    }
    
    @keyframes activate {
      0% {
        transform: translateY(-700px) scale(.7);
        opacity: .7;
      }

      80% {
        transform: translateY(0) scale(.7);
        opacity: .7;
      }

      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes inactivate {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      20% {
        transform: translateY(0) scale(.7);
        opacity: .7;
      }

      100% {
        transform: translateY(-700px) scale(.7);
        opacity: .7;
      }
    }
  </style>
  <main id="presentation"></main>
  <button id="prev-button" class="nav prev">&lt;</button>
  <button id="next-button" class="nav next">&gt;</button>
`

export default class MdPresentation extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
    this.shadowRoot.getElementById('prev-button')
      .addEventListener('click', this.previousSlide.bind(this))
    this.shadowRoot.getElementById('next-button')
      .addEventListener('click', this.nextSlide.bind(this))
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
    } else if (event.type === 'animationend') {
      const slide = event.target
      if (!slide.classList.contains('active')) {
        slide.style.display = 'none'
        this.displayActiveSlide()
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

  displayActiveSlide () {
    const index = this.activeSlide
    const newSlide = this.shadowRoot.querySelector(`[data-index="${index}"]`)
    if (newSlide) {
      newSlide.style.display = 'block'
      newSlide.classList.add('active')
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
    // Download the Markdown file
    const response = await fetch(newSrc)
    const markdown = await response.text()

    // Divide Markdown into rendered HTML sections
    const slides = splitMarkdownSections(markdown)
      .map((md, index) => /* html */ `
        <section data-index="${index}" class="slide" style="display: none">
          ${marked.parse(md)}
        </section>
      `)
      .join('')
    const presentation = this.shadowRoot.getElementById('presentation')
    presentation.innerHTML = slides
    const owner = this
    this.shadowRoot.querySelectorAll('.slide').forEach(slide => {
      slide.addEventListener('animationend', owner)
    })

    // Show the first or bookmarked slide
    const startSlide = window.location.hash.substr(1) || 0
    if (presentation.childElementCount > 0) {
      this.activeSlide = startSlide
    }
  }

  onChangeActiveSlide (newIndex, oldIndex) {
    // Save the new slide index in the URL hash
    const savedSlide = window.location.hash.substr(1)
    if (savedSlide != newIndex) {
      window.location.hash = newIndex
    }

    // Start transition away from old slide
    const oldSlide = this.shadowRoot.querySelector(`[data-index="${oldIndex}"]`)
    if (oldSlide) {
      oldSlide.classList.remove('active')
    } else {
      this.displayActiveSlide()
    }

    // Enable / disable the navigation buttons
    if (parseInt(newIndex) === 0) {
      this.shadowRoot.getElementById('prev-button').classList.add('off')
    } else {
      this.shadowRoot.getElementById('prev-button').classList.remove('off')
    }
    const presentation = this.shadowRoot.getElementById('presentation')
    if (parseInt(newIndex) === presentation.childElementCount - 1) {
      this.shadowRoot.getElementById('next-button').classList.add('off')
    } else {
      this.shadowRoot.getElementById('next-button').classList.remove('off')
    }
  }
}

customElements.define('md-presentation', MdPresentation)
