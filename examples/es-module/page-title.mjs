export default class PageTitle extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* html */ `
      <p>${document.title}</p>
    `
  }
}

customElements.define('page-title', PageTitle)
