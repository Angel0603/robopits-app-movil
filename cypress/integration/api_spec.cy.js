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

});
