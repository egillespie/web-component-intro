import marked from 'https://cdn.jsdelivr.net/npm/marked@3.0.8/lib/marked.esm.js'

const renderer = {
  link (href, title, text) {
    const link = /* html */ `<a href="${href}" target="_blank">${text}</a>`
    if (!href.includes('jsfiddle.net')) {
      return link
    }
    return /* html */ `
      ${link}
      <iframe
        src="${href}embedded/js,html,css,result/dark/"
        allowfullscreen="allowfullscreen"
        frameborder="0"
      ></iframe>
    `
  }
}

marked.use({ renderer })

export default marked
