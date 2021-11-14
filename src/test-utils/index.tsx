import React, { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const generateQueryClient = () => new QueryClient();
const renderWithQueryClient = (
    ui: ReactElement,
    client?: QueryClient
): RenderResult => {
    const queryClient = client ?? generateQueryClient();
    return render(
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
};
export default renderWithQueryClient;
