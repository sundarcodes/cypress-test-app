describe('Testing Good Reads home page', () => {
    it('should load the home page', () => {
        cy.visit('');
        cy.url().should('include', 'home');
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
    it('should decrement the read counter when an already read item in unchecked', () => {
        cy.get('.badge.badge-primary.badge-pill')
            .then($span => {
                const displayCounter = parseInt($span.text());
                cy.get('.fa-check-square-o').first().click();
                cy.get('.badge.badge-primary.badge-pill').contains(displayCounter - 1)
            })
    })
    it('should increment the read counter when an unread item is checked', () => {
        cy.get('.badge.badge-primary.badge-pill')
            .then($span => {
                const displayCounter = parseInt($span.text());
                cy.get('.fa-square-o').first().click();
                cy.get('.badge.badge-primary.badge-pill').contains(displayCounter + 1)
            })
    })
    it('should be able to delete an item from the collection', () => {
        cy.get('.card')
            .its('length')
            .then(totalItems => {
                cy.get('.delete > button').first().click();
                cy.get('.card')
                    .its('length').should('be.eq', totalItems - 1);
            })
    })
    it('should display new form on click of new button', () => {
        cy.get('div > a').contains('New').click({ force: true });
        cy.url().should('include', 'new');
    })
    it.only('should display list of blogs returned by server', () => {
        cy.server()           // enable response stubbing
        cy.route({
          method: 'GET',      // Route all GET requests
          url: '/api/index',    // that have a URL that matches '/users/*'
          response: 'fixture:index.json'   // and force the response to be: []
        })
        cy.visit('');
        cy.get('.card')
        .its('length')
        .should('be.eq', 7)
    })
})