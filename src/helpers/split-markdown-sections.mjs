export default markdown => markdown
  // Split the markdown wherever a # or ## heading appears
  .split(/^#{1,2}\s/m)
  // Trim off the whitespace
  .map(md => md.trim())
  // Remove blank lines
  .filter(md => md.length)
  // Reintroduce the # and ## headings
  .map((md, index) => index === 0 ? `# ${md}` : `## ${md}`)
