export default function (element, attribute, value) {
  if (element.getAttribute(attribute) !== value) {
    if (value != null) {
      element.setAttribute(attribute, value)
    } else {
      element.removeAttribute(attribute)
    }  
  }
}
