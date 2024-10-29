// Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../Login';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Para evitar advertencias en tests de animaciones


describe('Login', () => {
  it('Funcionamiento correcto del formulario para iniciar sesión', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: 'Login successful' }),
      status: 200,
    });

    render(<Login />);

    const emailInput = screen.getByText(/Ingrese su email/i);
    const passwordInput = screen.getByText(/Ingrese su contraseña/i);
    const loginButton = screen.getByText(/Iniciar sesión/i);

    // Simular ingreso de texto en los campos
    fireEvent.changeText(emailInput, '20211050@uthh.edu.mx');
    fireEvent.changeText(passwordInput, 'Ang#1324#');

    // Simular clic en el botón de login
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://back-end-robopits.vercel.app/api/login', expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: '20211050@uthh.edu.mx', Password: 'Ang#1324#' }),
      }));
    });

    // Limpiar el mock
    mockFetch.mockRestore();
  });
});
