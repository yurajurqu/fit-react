import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomInput from './CustomInput';

describe('when everything is ok', () => {
    test('should call the onchange callback handler when using the fireEvent function', () => {
        const onChange = jest.fn();
        render(<CustomInput value="" onChange={onChange} />);
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Omar Barboza',
            },
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    test('should call the onchange callback handler when using the userEvent function', async () => {
        const onChange = jest.fn();
        render(<CustomInput value="" onChange={onChange} />);
        await userEvent.type(screen.getByRole('textbox'), 'Omar Barboza');
        expect(onChange).toHaveBeenCalledTimes(12);
    });
});
