import React from 'react';
import { Select, MenuItem, SelectChangeEvent, styled, FormControl, InputLabel } from '@mui/material';

interface DropdownProps {
    options: string[];
    value?: string;
    onChange: (value: string) => void;
    label: string;
}

const StyledFormControl = styled(FormControl)`
    width: 300px !important;
    background-color: black;
`;

const StyledSelect = styled(Select)({
    background: 'black !important',
    color: 'white',
    '& .MuiSelect-icon': {
        color: 'white'
    }
});

const StyledMenuItem = styled(MenuItem)({});

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, label }) => {
    const handleChange = (event: SelectChangeEvent<unknown>) => {
        onChange(event.target.value as string);
    };

    return (
        <StyledFormControl>
            <InputLabel id="select-label" style={{ color: 'white' }}>
                {label}
            </InputLabel>
            <StyledSelect
                variant="filled"
                labelId="select-label"
                value={value}
                onChange={handleChange}
                MenuProps={{
                    PaperProps: {
                        style: {
                            backgroundColor: '#0f0f0f'
                        }
                    }
                }}
            >
                {options.map((option, index) => (
                    <StyledMenuItem key={index} value={option}>
                        {option}
                    </StyledMenuItem>
                ))}
            </StyledSelect>
        </StyledFormControl>
    );
};

export default Dropdown;
