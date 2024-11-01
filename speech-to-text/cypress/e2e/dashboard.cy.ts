describe('Dashboard Page Test', () => {
    beforeEach(() => {
      // Visit the dashboard page; replace `0` with the appropriate user ID
      cy.visit('http://localhost:3000/dashboard');
    });
  
    it('Should display the sidebar with navigation buttons', () => {
      cy.get('.side_bar').within(() => {
        cy.contains('Speech to Text Application').should('exist');
        cy.contains('Create New').should('exist');
        cy.contains('Collaborate').should('exist');
        cy.contains('Profile').should('exist');
        cy.contains('Log Out').should('exist');
      });
    });
  

    /*
    //This is assuming the logged in user has saved three speeches. 
    it('Should display saved speeches for user', () => {
      cy.get('h2').should('contain', 'Saved Speeches');
      cy.get('.speeches').within(() => {
        cy.contains('Speech 1').should('exist');
        cy.contains('Speech 2').should('exist');
        cy.contains('Speech 3').should('exist');
      });
    });
    */
  
    //This is assuming the logged in user has not saved any speeches yet
    it('Should show a message if no saved speeches exist', () => {
      cy.visit('http://localhost:3000/dashboard/'); 
      cy.get('.no_speech')
        .should('contain', "You don't have any saved speeches at the moment.");
    });
  
    it('Should navigate correctly using the sidebar links', () => {
        cy.contains('Create New').click();
        cy.url().should('include', '/create');
        cy.visit('http://localhost:3000/dashboard');
    
        cy.contains('Collaborate').click();
        cy.url().should('include', '/collaborate');
        cy.visit('http://localhost:3000/dashboard');
    
        cy.contains('Profile').click();
        cy.url().should('include', '/profile');
        cy.visit('http://localhost:3000/dashboard');
    
        cy.contains('Log Out').click();
        cy.url().should('include', '/login');
    });
  
    /*
    //This is assuming that the logged in user has saved speeches and one of their IDs is 001
    it('Should navigate to the speech detail page on speech title click', () => {
      cy.get('a[href="/speech/001"]').click(); // Adjust to the expected speech detail URL format
      cy.url().should('include', '/speech/001');
    });
    */
  });
  