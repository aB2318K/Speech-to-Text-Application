describe('Dashboard Page Test', () => {
    beforeEach(() => {
      // Visit the speech page, assuming the speech id is 001
      cy.visit('http://localhost:3000/speech/001');
    });
  
    it('Should display the sidebar with navigation buttons', () => {
      cy.get('.side_bar').within(() => {
        cy.contains('Speech to Text Application').should('exist');
        cy.contains('Home').should('exist');
        cy.contains('Create New').should('exist');
        cy.contains('Collaborate').should('exist');
        cy.contains('Profile').should('exist');
        cy.contains('Log Out').should('exist');
      });
    });

    
    it('Should display the speech title and text area for editing', () => {
        cy.get('input[id="title"]').should('exist').and('have.value', 'Speech 1'); // Check title input
        cy.get('textarea[id="speech"]').should('exist').and('contain', 'I am speech 1'); // Check text area for speech content
    });

    it('Should enable the Save button when title or speech content is modified', () => {
        cy.get('input[id="title"]').clear().type('Updated Speech Title');
        cy.get('button').contains('Save').should('not.be.disabled'); // Save button should be enabled
    });

    it('Should open the delete modal and return to the dashboard after confirmation', () => {
        cy.contains('Delete').click();
        cy.get('.delete_modal').should('be.visible'); // Delete modal should be visible
        cy.get('.confirm_delete').click(); // Confirm delete
        cy.url().should('include', '/dashboard'); // Should navigate to the dashboard after delete
    });

    it('Should open and close the export modal', () => {
        cy.contains('Export').click();
        cy.get('.export_modal').should('be.visible'); // Export modal should be visible
        cy.contains('Cancel').click();
        cy.get('.export_modal').should('not.exist'); // Export modal should be closed
    });

    it('Should export speech data as .txt file', () => {
        cy.contains('Export').click();
        cy.contains('Export as .txt').click();
        cy.get('.export_modal').should('not.exist');
    });

    it('Should export speech data as .csv file', () => {
        cy.contains('Export').click();
        cy.contains('Export as .csv').click();
        cy.get('.export_modal').should('not.exist');
    });

    it('Should navigate correctly using the sidebar links', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost:3000/speech/001'); // Return to speech page to test next link
    
        cy.contains('Create New').click();
        cy.url().should('include', '/create');
        cy.visit('http://localhost:3000/speech/001');
    
        cy.contains('Collaborate').click();
        cy.url().should('include', '/collaborate');
        cy.visit('http://localhost:3000/speech/001');
    
        cy.contains('Profile').click();
        cy.url().should('include', '/profile');
        cy.visit('http://localhost:3000/speech/001');
    
        cy.contains('Log Out').click();
        cy.url().should('include', '/login');
    });
});
  