import { render } from '@testing-library/react-native';
import React from 'react';
import { Header } from './Header';

test('Header', async () => {
    const title = 'Title';

    const { getByText } = render(<Header title={title}/>);

    const titleText = getByText(title);

    expect(titleText).toBeTruthy();

    const goBackText = getByText('Go back');

    expect(goBackText).toBeTruthy();
});