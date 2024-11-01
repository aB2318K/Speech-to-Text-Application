describe('Profile Page Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/profile');
    });
  
    it('Should display the sidebar with navigation buttons', () => {
      cy.get('.side_bar').within(() => {
        cy.contains('Speech to Text Application').should('exist');
        cy.contains('Home').should('exist');
        cy.contains('Collaborate').should('exist');
        cy.contains('Create New').should('exist');
        cy.contains('Log Out').should('exist');
      });
    });

    it('Should have user information with edit and change password buttons', () => {
        cy.get('.first_name').should('exist').and('contain', 'First Name:').and('contain', 'Edit');
        cy.get('.last_name').should('exist').and('contain', 'Last Name:').and('contain', 'Edit');
        cy.contains('Change Password').should('exist');
    })

    it('Should open first name and last name edit modals when clicked edit for each and let users to update their name', () => {
        cy.get('.edit_first_name').click();
        cy.get('.edit_first_modal').should('be.visible'); 
        cy.contains('Cancel').click();
        cy.get('.edit_first_modal').should('not.exist');
        
        cy.get('.edit_first_name').click();
        cy.get('input[id="first_name"]').should('exist');
        cy.get('input[id="first_name"]').clear().type('Name');
        cy.contains('Save').click();
        cy.get('.first_name').should('contain', 'Name'); 
        
        cy.get('.edit_last_name').click();
        cy.get('.edit_last_modal').should('be.visible');
        cy.contains('Cancel').click();
        cy.get('.edit_last_modal').should('not.exist');
        
        cy.get('.edit_last_name').click();
        cy.get('input[id="last_name"]').should('exist');
        cy.get('input[id="last_name"]').clear().type('Name'); 
        cy.contains('Save').click();
        cy.get('.last_name').should('contain', 'Name');
    });

    it('Should open the password update modal when clicked, check for validation and match errors', () => {
        cy.get('button').contains('Change Password').click();
        cy.get('.password_modal').should('be.visible');
        cy.get('button').contains('Save').click();
        cy.get('.error_message').should('contain', '*Your password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character');
        cy.get('input[id="new_password"]').type('NewPass1!');
        cy.get('button').contains('Save').click();
        cy.get('.match_error').should('contain', '*Passwords do not match');

        cy.get('input[id="current_password"]').type('dummyCurrentPassword'); // This can be any text for testing
        cy.get('input[id="new_password"]').clear().type('NewPass1!'); // Valid new password
        cy.get('input[id="re_password"]').clear().type('NewPass1!'); // Match new password
    
        // Submit the form with valid data
        cy.get('button').contains('Save').click();
    
        // After submission, check that the modal is closed and validation messages are gone
        cy.get('.password_modal').should('not.exist'); // Ensure modal is closed
        cy.get('.error_message').should('not.exist'); // No error for new password validation
        cy.get('.match_error').should('not.exist'); // No error for password match validation
    });

    it('Should navigate correctly using the sidebar links', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost:3000/profile');

        cy.contains('Create New').click();
        cy.url().should('include', '/create');
        cy.visit('http://localhost:3000/profile');
    
        cy.contains('Collaborate').click();
        cy.url().should('include', '/collaborate');
        cy.visit('http://localhost:3000/profile');
    
        cy.contains('Log Out').click();
        cy.url().should('include', '/login');
    });
});
  