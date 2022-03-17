/// <reference types="cypress" />


function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    (a) => ({
      id: a.id,
      impact: a.impact,
      description: a.description,
      nodes: a.nodes.length,
      tags: a.tags,
      nd: JSON.stringify(a.nodes.map(e => e.target)),
      help: a.helpUrl,
    })
  )

  cy.task('table', violationData)
}

describe('Nearform about page', () => {
  // beforeEach(() => {
    
  //   cy.injectAxe()
  // })

  // Basic usage
  it('Has no detectable a11y violations on load',  () => {
    // Test the page at initial load
    cy.visit('https://www.nearform.com/about')
    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog, false)
  })
})
