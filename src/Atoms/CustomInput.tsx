import TextField from '@mui/material/TextField';
import React from 'react';

interface CustomImputProps {
    value: string;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const CustomInput = function ({ value, onChange }: CustomImputProps) {
    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={value}
                onChange={onChange}
                placeholder="Enter character name"
            />
        </div>
    );
};

export default CustomInput;
