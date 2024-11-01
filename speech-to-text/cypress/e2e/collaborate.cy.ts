describe('Collaborate Page Test', () => {
    beforeEach(() => {
      // Visit the speech page, assuming the speech id is 001
      cy.visit('http://localhost:3000/collaborate');
    });
  
    it('Should display the sidebar with navigation buttons', () => {
      cy.get('.side_bar').within(() => {
        cy.contains('Speech to Text Application').should('exist');
        cy.contains('Home').should('exist');
        cy.contains('Create New').should('exist');
        cy.contains('Profile').should('exist');
        cy.contains('Log Out').should('exist');
      });
    });

    
    it('Should display a textarea to view the transcription', () => {
        cy.get('textarea[id="speech"]').should('exist');
    });

    it('Should have a start button which turns into stop when clicked making the controller button visible', () => {
        cy.get('.start_button').should('exist');
        cy.get('.start_button').should('contain', 'Start');
        cy.get('.start_button').click();
        cy.get('.start_button').should('contain', 'Stop');
        cy.get('.controller').should('be.visible');
    })

    it('Should let users toggle between pause and resume controller', () => {
        cy.get('.start_button').click();
        cy.get('.controller').should('contain', 'Pause');
        cy.get('.controller').click();
        cy.get('.controller').should('contain', 'Resume');
        cy.get('.controller').click();
        cy.get('.controller').should('contain', 'Pause');
        cy.get('.start_button').click();
    })

    it('Should not let users save and export empty speech', () => {
        cy.get('.start_button').click();
        cy.get('.start_button').click();
        cy.get('.save_button').should('be.disabled');
        cy.get('.export_button').should('be.disabled');
    })

    it('Should let users click save and open the save modal after stopping the session', () => {
        cy.get('.start_button').click();
        cy.get('textarea').type('Speech');
        cy.get('.start_button').click();
        cy.get('.save_button').click();
        cy.get('.save_modal').should('be.visible');
    })

    it('Should let users type the title into an input field and save it navigating to dashboard', () => {
        cy.get('.start_button').click();
        cy.get('textarea').type('Speech');
        cy.get('.start_button').click();
        cy.get('.save_button').click();
        cy.get('.save_modal').should('be.visible');
        cy.get('input[id="title"]').should('exist');
        cy.get('.confirm_save').should('be.disabled');
        cy.get('input[id="title"]').type('Title');
        cy.get('.confirm_save').click();
        cy.url().should('include', '/dashboard')
    })

    it('Should close the save modal when cancelled', () => {
        cy.get('.start_button').click();
        cy.get('textarea').type('Speech');
        cy.get('.start_button').click();
        cy.get('.save_button').click();
        cy.get('.save_modal').should('be.visible');
        cy.contains('Cancel').click();
        cy.get('.save_modal').should('not.exist');
    })

    it('Should start a new session when create new is clicked', () => {
        cy.get('.start_button').click();
        cy.get('.start_button').click();
        cy.contains('Create New').click();
        cy.get('textarea[id="speech"]').should('have.value', '');
        cy.url().should('include', '/create'); 
        cy.contains('Save').should('be.disabled');
        cy.contains('Delete').should('be.disabled');
        cy.contains('Resume').should('be.disabled');
        cy.contains('Export').should('be.disabled');
        cy.contains('Create New').should('be.disabled');
    })

    it('Should open the delete modal and start new session when confirmed', () => {
        cy.get('.start_button').click();
        cy.get('.start_button').click();
        cy.contains('Delete').click();
        cy.get('.delete_modal').should('be.visible'); // Delete modal should be visible
        cy.get('.confirm_delete').click(); // Confirm delete
        cy.get('textarea[id="speech"]').should('have.value', '');
        cy.url().should('include', '/collaborate'); 
        cy.contains('Save').should('be.disabled');
        cy.contains('Delete').should('be.disabled');
        cy.contains('Resume').should('be.disabled');
        cy.contains('Export').should('be.disabled');
    });

    it('Should close the delete modal when cancelled', () => {
        cy.get('.start_button').click();
        cy.get('.start_button').click();
        cy.contains('Delete').click();
        cy.contains('Cancel').click();
        cy.get('delete_modal').should('not.exist');
    })

    it('Should open and close the export modal', () => {
        cy.get('.start_button').click();
        cy.get('textarea').type('Speech');
        cy.get('.start_button').click();
        cy.contains('Export').click();
        cy.get('.export_modal').should('be.visible'); // Export modal should be visible
        cy.contains('Cancel').click();
        cy.get('.export_modal').should('not.exist'); // Export modal should be closed
    });

    it('Should export speech data as .txt file', () => {
        cy.get('.start_button').click();
        cy.get('textarea').type('Speech');
        cy.get('.start_button').click();
        cy.contains('Export').click();
        cy.contains('Export as .txt').click();
        cy.get('.export_modal').should('not.exist');
    });

    it('Should export speech data as .csv file', () => {
        cy.get('.start_button').click();
        cy.get('textarea').type('Speech');
        cy.get('.start_button').click();
        cy.contains('Export').click();
        cy.contains('Export as .csv').click();
        cy.get('.export_modal').should('not.exist');
    });

    it('Should navigate correctly using the sidebar links', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost:3000/collaborate');
    
        cy.contains('Create New').click();
        cy.url().should('include', '/create');
        cy.visit('http://localhost:3000/collaborate');
    
        cy.contains('Profile').click();
        cy.url().should('include', '/profile');
        cy.visit('http://localhost:3000/collaborate');
    
        cy.contains('Log Out').click();
        cy.url().should('include', '/login');
    });
    
    it('Should display the collaborators sidebar with invite button', () => {
        cy.get('.collab_bar').should('exist').and('contain', 'Collaborators');
        cy.get('.invite_btn').should('exist').and('contain', 'Invite User');
    })

    it('Should open invite modal when clicked on invite button asking for a collaborator email', () => {
        cy.get('.invite_btn').click();
        cy.get('.invite_modal').should('be.visible');
        cy.get('input[type="email"]').should('exist');
    })

    it('Should not let users input invalid email or email with no associated user', () => {
        cy.get('.invite_btn').click();
        cy.get('input[type="email"]').type('invalidEmail');
        cy.get('.confirm_invite').click();
        cy.get('.error_message').should('exist');
        cy.get('.invite_modal').should('be.visible');
        //Logic for non registered email
    })

    it('Should close the invite modal when cancelled', () => {
        cy.get('.invite_btn').click();
        cy.contains('Cancel').click();
        cy.get('.invite_modal').should('not.exist');
    })

    it('Should display a success message, close the modal and add the inivited user to the collaborator list as pending while waiting his approval', () => {
        cy.get('.invite_btn').click();
        cy.get('input[type="email"]').type('validEmail@example.com');
        cy.get('.confirm_invite').click();
        cy.get('.success_message').should('exist').and('contain', 'Invitation link sent');
        cy.get('.invite_modal').should('not.exist');
        cy.get('.collaborators_list').should('contain', 'valid (Pending)');
    })

    it('Should allow users to remove collaborators, open a remove modal to ask for confirmation when clicked and remove on confirmation', () => {
        cy.get('.invite_btn').click();
        cy.get('input[type="email"]').type('validEmail@example.com');
        cy.get('.confirm_invite').click();
        cy.get('.collaborators_list').should('contain', 'valid');
        cy.get('#valid_remove').should('exist');
        cy.get('#valid_remove').click();
        cy.get('.remove_modal').should('be.visible').and('contain', `Are you sure you want to remove 'valid'?`);
        cy.get('.confirm_remove').click();
        cy.get('.remove_modal').should('not.exist');
        cy.get('.collaborators_list').should('not.contain', 'valid');
    })

    it('Should close the remove modal if cancelled', () => {
        cy.get('.invite_btn').click();
        cy.get('input[type="email"]').type('validEmail@example.com');
        cy.get('.confirm_invite').click();
        cy.get('.collaborators_list').should('contain', 'valid');
        cy.get('#valid_remove').should('exist');
        cy.get('#valid_remove').click();
        cy.contains('Cancel').click();
        cy.get('.remove_modal').should('not.exist');
    })
});
  