describe("login", () => {
    it("example", () => {
        cy.visit("/login-page")
        cy.get('#cc').type("77777777")
        cy.get('#password').type("77777777")
        cy.get('.CardFooter-cardFooter-318 > .MuiButtonBase-root').click()
    })
})