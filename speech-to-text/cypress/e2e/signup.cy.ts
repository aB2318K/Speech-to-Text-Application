describe('signup_page_test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signup');
    });
    it('Should display sign up form', () => {
        cy.get('form').should('exist');
        cy.get('input[type="email"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    })
    it('Should not let users register with empty credentials', () => {
        cy.get('button[type="submit"]').click();
        cy.get('input:invalid').should('have.length', 2);
    })

    it('Should not let users register with invalid email format', () => {
        cy.get('input[type="email"]').type('invalidEmail');
        cy.get('input[type="password"]').type('validPassword1!');
        cy.get('button[type="submit"]').click();
        cy.get('input[type="email"]:invalid').should('exist');
    })

    it('Should not let users register with invalid password', () => {
        cy.get('input[type="email"]').type('validEmail@example.com');
        cy.get('input[type="password"]').type('invalidPassword');
        cy.get('button[type="submit"]').click();
        cy.get('input[type="password"]:invalid').should('exist');
    })

    it('Should navigate to log in page upon successful registration', () => {
        cy.get('input[type="email"]').type('validEmail@example.com');
        cy.get('input[type="password"]').type('validPassword1!');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
    })

    /*
    it('Should not let users register with a registered email', () => {

    }) 
    */
})