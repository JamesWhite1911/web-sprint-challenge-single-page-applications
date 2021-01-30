//file containing our cypress tests

describe ('Tests', () => {
    //before testing we visit our page
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    //sanity test
    it('Am I sane?', () => {
        expect (2+2).to.equal(4)
    })

    //our tests here
    it('Test text box', () => {
        cy
        .get('#name').should('exist').type('Testing').should('have.value', 'Testing')
    })

    it('Test selecting multiple toppings', () => {
        cy
        .get('#pepperoni').click().should('be.checked')
        .get('#cheese').click().should('be.checked')
    })

    it('Test if we can submit an order', () => {
        cy
        .get('#name').type('Test')
        .get('select').select('medium')
        .get('button').click()
    })

})