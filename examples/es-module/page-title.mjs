export default class PageTitle extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    const title = document.querySelector('title').innerHTML
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          display: inline-block;
          font-family: sans-serif;
        }
        
        p {
          text-decoration: underline;
          font-weight: bold;
        }
      </style>
      <p>${title}</p>
    `
  }
}

customElements.define('page-title', PageTitle)
