import { Select, FormControl, styled } from '@mui/material';

export const StyledFormControl = styled(FormControl)`
    width: 300px !important;
    background-color: black;
`;

export const StyledSelect = styled(Select)({
    background: 'black !important',
    color: 'white',
    '& .MuiSelect-icon': {
        color: 'white'
    }
});
