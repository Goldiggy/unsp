import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { HomeScreen } from './HomeScreen';

test('examples of Home Screen', async () => {
    const mockedProps: any = {
        navigation: {
            navigate: jest.fn(),
        }
    };

    const { getByText } = render(<HomeScreen {...mockedProps}/>);

    const text = getByText('Welcome to home screen');

    expect(text).toBeTruthy();

    const buttonToProfile = getByText('Go to Profile screen');

    fireEvent(buttonToProfile, 'onPress');
});