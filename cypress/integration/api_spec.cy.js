// cypress/integration/api_spec.js

describe('API Tests', () => {
  it('should return a success message with correct credentials', () => {
    cy.request({
      method: 'POST',
      url: 'https://back-end-robopits.vercel.app/api/login',
      body: {
        Email: '20211050@uthh.edu.mx',
        Password: 'Ang#1324#'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Inicio de sesión exitoso'); // Mensaje en español
    });
  });

  it('should return an error message with incorrect credentials', () => {
    cy.request({
      method: 'POST',
      url: 'https://back-end-robopits.vercel.app/api/login',
      failOnStatusCode: false, // Esto permite que Cypress continúe en caso de error
      body: {
        Email: 'incorrect@uthh.edu.mx',
        Password: 'wrongpassword'
      }
    }).then((response) => {
      expect(response.status).to.eq(401); // O el código de error esperado
      expect(response.body.message).to.eq('No se pudo iniciar sesión'); // Mensaje en español
    });
  });
});
