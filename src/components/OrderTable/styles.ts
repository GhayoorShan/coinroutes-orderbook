// StyledComponents.tsx
import { Table, TableHead, TableRow, styled } from '@mui/material';

export const StyledTableContainer = styled('div')({
    maxHeight: 250,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#474747',
        borderRadius: '4px'
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#5F5F5F'
    }
});

export const StyledTable = styled(Table)({
    maxWidth: 300,
    borderCollapse: 'collapse'
});

export const StyledTableRow = styled(TableRow)<{ percentage: number; type: 'bid' | 'ask' }>(({ percentage, type }) => ({
    background: `linear-gradient(to right, ${type === 'bid' ? '#2ECC71' : '#F44336'} ${percentage}%, transparent 0)`,
    '& > *': {
        padding: '5px',
        fontSize: '14px',
        borderBottom: 'none'
    }
}));

export const StyledHeadRow = styled(TableRow)({
    '& > *': {
        padding: '2px',
        fontSize: '14px',
        borderBottom: 'none !important'
    }
});

export const StyledTableHead = styled(TableHead)({
    '& > *': {
        padding: '0px',
        fontSize: '14px',
        borderBottom: 'none !important'
    }
});

export const ShimmerRow = styled(TableRow)(({ theme }) => ({
    '& > *': {
        padding: '2px',
        fontSize: '14px',
        width: '150px',
        borderBottom: 'none !important',
        backgroundColor: theme.palette.background.default,
        animation: 'shimmer 1.5s infinite linear',
        backgroundImage: `linear-gradient(to right, ${theme.palette.background.default} 0%, #272727 30%, ${theme.palette.background.default} 40%, ${theme.palette.background.default} 100%)`,
        backgroundSize: '1000px 100%',
        '@keyframes shimmer': {
            '0%': {
                backgroundPosition: '-500px 0'
            },
            '100%': {
                backgroundPosition: '500px 0'
            }
        }
    }
}));
