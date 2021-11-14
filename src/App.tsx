import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PeopleDetail from './Pages/PeopleDetail';

const queryClient = new QueryClient();

const App = function () {
    return (
        <QueryClientProvider client={queryClient}>
            <Switch>
                <Route path="/detail">
                    <PeopleDetail />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
