// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let commands = []

Cypress.on('test:after:run', (attributes) => {
  /* eslint-disable no-console */
  console.log('Test "%s" has finished in %dms',
    attributes.title, attributes.duration)
  console.table(commands)
  commands.length = 0
})

Cypress.on('command:start', (c) => {
  commands.push({
    name: c.attributes.name,
    started: +new Date(),
  })
})

Cypress.on('command:end', (c) => {
  const lastCommand = commands[commands.length - 1]

  if (lastCommand.name !== c.attributes.name) {
    throw new Error('Last command is wrong')
  }

  lastCommand.endedAt = +new Date()
  lastCommand.elapsed = lastCommand.endedAt - lastCommand.started
})