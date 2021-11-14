import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { data } from '../test-utils/data';

// TODO REMOVE AXIOS
describe.only('when people data exists', () => {
    beforeEach(async () => {
        fetch.resetMocks();
        fetch.mockResponseOnce(JSON.stringify(data));
        const history = createMemoryHistory();
        history.push('/detail', {
            people: {
                name: 'random name',
                height: '1.50m',
                birth_year: '2021-10-09',
                gender: 'Male',
                url: 'theurl',
            },
            page: 1,
            search: '',
        });
        render(
            <Router history={history}>
                <App />
            </Router>
        );
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('should render character detail', async () => {
        screen.debug();
        screen.debug();
        expect(await screen.findByText(/random name/)).toBeInTheDocument();
        expect(await screen.findByText(/1.50m/)).toBeInTheDocument();
        expect(await screen.findByText(/2021-10-09/)).toBeInTheDocument();
        expect(await screen.findByText(/Male/)).toBeInTheDocument();
    });
    test('should return back', async () => {
        screen.debug();
        screen.debug();
        expect(await screen.findByText(/random name/)).toBeInTheDocument();
        expect(await screen.findByText(/1.50m/)).toBeInTheDocument();
        expect(await screen.findByText(/2021-10-09/)).toBeInTheDocument();
        expect(await screen.findByText(/Male/)).toBeInTheDocument();

        await userEvent.click(screen.getAllByRole('button')[1]);
        screen.debug();
        expect(await screen.findByText(/Previous/)).toBeInTheDocument();
        screen.debug();
        expect(fetch).toHaveBeenCalledTimes(1);
    });
    test('should open learn more link', async () => {
        global.open = jest.fn();

        screen.debug();
        expect(await screen.findByText(/random name/)).toBeInTheDocument();
        expect(await screen.findByText(/1.50m/)).toBeInTheDocument();
        expect(await screen.findByText(/2021-10-09/)).toBeInTheDocument();
        expect(await screen.findByText(/Male/)).toBeInTheDocument();

        await userEvent.click(screen.getAllByRole('button')[0]);
        screen.debug();
        expect(global.open).toHaveBeenCalledWith('theurl');
    });
});
describe.only('when people data does not exist', () => {
    beforeEach(async () => {
        const history = createMemoryHistory();
        history.push('/detail', { people: null, page: 3, search: 'search' });
        render(
            <Router history={history}>
                <App />
            </Router>
        );
    });
    test('should render No people available', async () => {
        screen.debug();
        expect(
            await screen.findByText(/No people available/)
        ).toBeInTheDocument();
        screen.debug();
    });
});
