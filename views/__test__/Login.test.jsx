// Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../Login';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Para evitar advertencias en tests de animaciones


describe('Login', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Login successful' }),
        status: 200,
      })
    );
  });

  afterAll(() => {
    delete global.fetch; // Limpiar el mock después de las pruebas
  });

  it('Funcionamiento correcto del formulario para iniciar sesión', async () => {
    render(<Login />);

    const emailInput = screen.getByText(/Ingrese su email/i);
    const passwordInput = screen.getByText(/Ingrese su contraseña/i);
    const loginButton = screen.getByText(/Iniciar sesión/i);

    fireEvent.changeText(emailInput, '20211050@uthh.edu.mx');
    fireEvent.changeText(passwordInput, 'Ang#1324#');

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://back-end-robopits.vercel.app/api/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email: '20211050@uthh.edu.mx', Password: 'Ang#1324#' }),
        })
      );
    });
  });
});
