it('drags a card from "TODO" to "Doing"', () => {
  cy.visit('/')
  const dataTransfer = new DataTransfer()
  dataTransfer.setData('plain/text', 'Buy milk')
  cy.contains(/todo/i).parent().within(() => {
    cy.contains(/buy milk/i).trigger('dragstart', { dataTransfer })
  })

  cy.contains(/doing/i).trigger('drop', { dataTransfer })

  cy.contains(/todo/i).parent().within(() => {
    cy.contains(/buy milk/i).trigger('dragend', { dataTransfer })
  })

  cy.contains(/todo/i).parent().within(() => {
    cy.contains('Buy milk').should('not.exist')
  })

  cy.contains(/doing/i).parent().within(() => {
    cy.contains('Buy milk').should('exist')
  })
})

export {}
