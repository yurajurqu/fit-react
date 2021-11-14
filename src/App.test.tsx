import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import App from './App';
import { data, dataSearch } from './test-utils/data';

describe('when everything is ok 2', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    beforeEach(async () => {
        fetch.resetMocks();
        fetch.mockResponse((req) => (req.url.indexOf('xxx') > -1 ? Promise.resolve(JSON.stringify(dataSearch)) : Promise.resolve(JSON.stringify(data))));
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
        );
    });

    test('should render search people', async () => {
        screen.debug();
        const luke = await screen.findByText(/Skywilker/);
        screen.debug();
        expect(luke).toBeInTheDocument();
        await userEvent.type(screen.getByRole('textbox'), 'xxx');
        const lukeXXX = await screen.findByText(/Luke Skywilker xxx/);
        screen.debug();
        expect(lukeXXX).toBeInTheDocument();
    });
});
