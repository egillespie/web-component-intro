// Converts a kebab-case string to PascalCase
export const kebabToPascalCase = str =>
  str.split('-').map(s => s.replace(/^\w/, c => c.toUpperCase())).join('')

// Divides a single Markdown string into an array of Markdown strings using
// # and ## headings as section breaks.
export const splitMarkdownSections = markdown => markdown
  // Split the markdown wherever a # or ## heading appears
  .split(/^#{1,2}\s/m)
  // Trim off the whitespace
  .map(md => md.trim())
  // Remove blank lines
  .filter(md => md.length)
  // Reintroduce the # and ## headings
  .map((md, index) => index === 0 ? `# ${md}` : `## ${md}`)

// Call this in a web component's `attributeChangedCallback` function:
//
// ``` js
// attributeChangedCallback () {
//   invokeOnChangeAttribute(this, ...arguments)
// }
// ```
//
// This function will look for an `onChange*` function on the instance and
// invoke it, where `*` is the camel-case name of the attribute that was
// changed. For example, if a `close-label` attribute is changed, this function
// will call `onChangeCloseLabel` on the instance if it exists.
export function invokeOnChangeAttribute (instance, name, oldValue, newValue) {
  const funcName = `onChange${kebabToPascalCase(name)}`
  const onChangeHandler = instance[funcName]?.bind(instance)
  if (onChangeHandler) {
    onChangeHandler(newValue, oldValue)
  }
}

// Use in setters of web components to set an attribute if it has changed
export function syncAttribute (element, attribute, value) {
  if (element.getAttribute(attribute) !== value) {
    if (value != null) {
      element.setAttribute(attribute, value)
    } else {
      element.removeAttribute(attribute)
    }  
  }
}
