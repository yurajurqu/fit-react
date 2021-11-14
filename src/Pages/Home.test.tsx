import React from 'react';
import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { noData } from '../test-utils/data';
import Home from './Home';
import renderWithQueryClient from '../test-utils';

describe('when there is backend error 555', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    beforeEach(async () => {
        fetch.resetMocks();
        const history = createMemoryHistory();
        renderWithQueryClient(
            <Router history={history}>
                <Home />
            </Router>
        );
    });

    test('should render non existent data', async () => {
        fetch.mockResponseOnce(JSON.stringify(noData));
        const errorInfo = await screen.findByText(/Non existent data/);
        screen.debug();
        expect(errorInfo).toBeInTheDocument();
    });
});
