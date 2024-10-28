import { render } from '@testing-library/react-native';

import QuienesSomos from '../QuienesSomos';


test('debe mostrar el mensaje "Quiénes Somos"', () => {
    const { getByText } = render(<QuienesSomos />);
    expect(getByText('Quiénes Somos')).toBeTruthy();
});