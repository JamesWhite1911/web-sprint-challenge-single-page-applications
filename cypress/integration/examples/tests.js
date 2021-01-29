
describe ('Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    //sanity test
    it('Am I sane?', () => {
        expect (2+2).to.equal(4)
    })

    //our tests here
    
})