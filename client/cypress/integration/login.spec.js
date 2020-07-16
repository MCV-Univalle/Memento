describe("login", () => {
    it("example", () => {
        cy.visit("/login-page")
        cy.get('#cc').type("77777777")
        cy.get('#password').type("77777777")
        cy.get('.CardFooter-cardFooter-318 > .MuiButtonBase-root').click()
    })
})

describe("create a relationship", () => {
    it("Upload family", () => {
        cy.visit("/familiarUpload-page")
        cy.get('.css-tlfecz-indicatorContainer').click()
        cy.get('.css-1hwfws3').type("Mamá").type()
        cy.get('.CardFooter-cardFooter-318 > .MuiButtonBase-root').click()
    })
})