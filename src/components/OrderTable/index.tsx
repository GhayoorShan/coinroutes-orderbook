import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StyledTable = styled(Table)({
    maxWidth: 300,
    marginBottom: 20,
    borderCollapse: 'collapse'
});

const StyledTableRow = styled(TableRow)<{ percentage: number; type: 'bid' | 'ask' }>(({ percentage, type }) => ({
    background: `linear-gradient(to right,${type === 'bid' ? '#2ECC71 ' : '#F44336'} ${percentage}%, transparent 0)`,
    '& > *': {
        padding: '5px',
        fontSize: '14px',
        borderBottom: 'none',
        width: '150px'
    }
}));

const StyledHeadRow = styled(TableRow)({
    '& > *': {
        padding: '5px',
        fontSize: '14px',
        borderBottom: 'none !important'
    }
});

const StyledTableHead = styled(TableHead)({
    '& > *': {
        padding: '0px',
        fontSize: '14px',
        borderBottom: 'none !important'
    }
});

const ShimmerRow = styled(TableRow)(({ theme }) => ({
    '& > *': {
        padding: '5px',
        fontSize: '14px',
        width: '150px',
        borderBottom: 'none !important',
        backgroundColor: theme.palette.background.default,
        animation: 'shimmer 1.5s infinite linear',
        backgroundImage: `linear-gradient(to right, ${theme.palette.background.default} 0%, #121212 30%, ${theme.palette.background.default} 40%, ${theme.palette.background.default} 100%)`, // Use theme color dynamically
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

interface OrderTableProps {
    headers: string[];
    data: { price: string; size: string; percentage?: number; type: 'bid' | 'ask' }[];
}

const OrderTable: React.FC<OrderTableProps> = ({ headers, data }) => {
    const theme = useTheme();
    return (
        <StyledTable>
            <StyledTableHead>
                <StyledHeadRow>
                    {headers.map((header, index) => (
                        <TableCell key={index}>{header}</TableCell>
                    ))}
                </StyledHeadRow>
            </StyledTableHead>
            <TableBody>
                {data.length !== 0
                    ? data.map((row, index) => (
                          <StyledTableRow key={index} percentage={Number(row.percentage) || 0} type={row.type}>
                              <TableCell>{row.price}</TableCell>
                              <TableCell>{row.size}</TableCell>
                          </StyledTableRow>
                      ))
                    : // Render shimmer UI
                      Array.from({ length: 10 }).map((_, index) => (
                          <ShimmerRow key={index} theme={theme}>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                          </ShimmerRow>
                      ))}
            </TableBody>
        </StyledTable>
    );
};

export default OrderTable;
