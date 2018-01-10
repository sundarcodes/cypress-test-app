describe('Testing Good Reads home page', () => {
    it('should load the home page', () => {
        cy.visit('');
        cy.url().should('include','home');
    })
    it('should be able to see the app name', () => {
        cy.get('.navbar-brand').contains('My Good Reads');
    })
    it('should load a list of good reads', () => {
        cy.get('.card')
        .its('length')
        .should('be.gt', 0)
    })
    it('should match the number of reads to equal to the read counter', () => {
        cy.get('.fa-check-square-o')
        .its('length')
        .then(readsCount => {
            cy.get('.badge.badge-primary.badge-pill')
            .then($span => {
                const displayCounter = parseInt($span.text())
                expect(displayCounter === readsCount).to.be.true
            })
        })
    })
})