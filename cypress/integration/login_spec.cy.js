// cypress/integration/login_spec.js

  describe('Login Functionality', () => {
    beforeEach(() => {
      cy.visit('https://www.robopits.online/login');
    });
  
    it('should log in successfully with correct credentials', () => {
      cy.get('[placeholder="Ingrese su email"]', { timeout: 5000 })
        .should('be.visible')
        .type('20211050@uthh.edu.mx');
      
      cy.get('[placeholder="Ingrese su contraseña"]', { timeout: 5000 })
        .should('be.visible')
        .type('Ang#1324#');
      
      cy.contains('Continuar').click();
  
      cy.url().should('include', 'https://www.robopits.online/todos-los-productos'); // Ajusta esto a la URL esperada después de iniciar sesión
      cy.contains('Bienvenido').should('be.visible'); // Ajusta esto al mensaje esperado
    });
  });
  