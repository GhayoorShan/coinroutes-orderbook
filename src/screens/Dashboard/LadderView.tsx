// src/components/LadderView.tsx
import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const StyledTable = styled(Table)({
    minWidth: 300,
    maxWidth: 300,
    marginBottom: 20,
    background: '#0A0B0D', // Dark background color
    borderCollapse: 'collapse'
});

const StyledTableRow = styled(TableRow)(() => ({
    '& > *': {
        padding: '5px',
        fontSize: '14px',
        borderBottom: 'none'
    }
}));
const StyledTableHead = styled(TableHead)({
    '& > *': {
        borderBottom: 'none'
    }
});

const LadderView: React.FC<{}> = () => {
    // const topBids = bids.slice(0, 10);
    // const topAsks = asks.slice(0, 10);
    const { bids, asks } = useSelector((state: RootState) => state.orderBook);

    console.log('LadderView', bids, asks);

    return (
        // <></>
        <Box>
            <Typography variant="h6">Bids</Typography>
            <StyledTable>
                <StyledTableHead>
                    <StyledTableRow>
                        <TableCell>Bid Price</TableCell>
                        <TableCell>Bid Size</TableCell>
                        <TableCell>Weight</TableCell>
                    </StyledTableRow>
                </StyledTableHead>
                <TableBody>
                    {Object.entries(bids).map(([key, value]) => (
                        <StyledTableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </StyledTable>

            {/* <Typography variant="h6">Asks</Typography>
            <StyledTable>
                <StyledTableHead>
                    <StyledTableRow>
                        <TableCell>Ask Price</TableCell>
                        <TableCell>Ask Size</TableCell>
                        <TableCell>Weight</TableCell>
                    </StyledTableRow>
                </StyledTableHead>
                <TableBody>
                    {asks.map((ask, index) => (
                        <StyledTableRow key={index}>
                            {ask.price}
                            <TableCell>{ask.best_ask}</TableCell>
                            <TableCell>{ask.best_ask_size}</TableCell>
                            <AskTableCell value={parseFloat(ask.best_ask_size)} maxValue={maxAskSize}></AskTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </StyledTable> */}
        </Box>
    );
};

export default LadderView;
