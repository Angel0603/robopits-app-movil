// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}', // Asegúrate de que el patrón coincida con tus archivos de prueba
    // puedes ajustar el patrón de búsqueda según tu estructura de archivos
  },
});
