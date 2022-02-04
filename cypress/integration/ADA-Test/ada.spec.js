// Define at the top of the spec file or just import it
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

/// <reference types="cypress" />
describe('ADA Test group', () => {
  it('Logs violations to the terminal', () => {
    cy.visit('https://demo.opencart.com/')
    cy.injectAxe()
    cy.checkA11y(null, null, terminalLog)
  })

})