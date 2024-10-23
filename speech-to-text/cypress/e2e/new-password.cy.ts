describe('login_page_test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/new-password/[id]');
    });
    it('Should display new password Form', () => {
        cy.get('form').should('exist');
        cy.get('input[type="password"]').should('exist').and('have.length', 2);
        cy.get('button[type="submit"]').should('exist');
    })

    it('Should not let users submit with invalid password', () => {
        cy.get('input[id="password"]').type('invalidPassword');
        cy.get('input[id="re-enter-password"]').type('invalidPassword');
        cy.get('button[type="submit"]').click();
        cy.get('.error_message').should('be.visible').and('contain', '*Your password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character');
    })
    
    it('Should not let users submit with unmatching passwords', () => {
        cy.get('input[id="password"]').type('validPassword1!');
        cy.get('input[id="re-enter-password"]').type('validPassword2!');
        cy.get('button[type="submit"]').click();
        cy.get('.empty_error').should('be.visible').and('contain', '*Passwords do not match');
    })

    it('Should navigate to log in page upon success', () => {
        cy.get('input[id="password"]').type('validPassword1!');
        cy.get('input[id="re-enter-password"]').type('validPassword1!');
        cy.get('button[type="submit"]').click();
        cy.get('.success_message').should('exist').and('contain', 'You have successfully updated your password. Redirecting to Log In page')
        cy.url().should('include', '/login');
    })

} )

