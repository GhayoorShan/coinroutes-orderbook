// OrderTable.tsx
import React from 'react';
import { TableBody, TableCell } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StyledTable, StyledTableContainer, StyledTableRow, StyledHeadRow, StyledTableHead, ShimmerRow } from './styles';

interface OrderTableProps {
    headers: string[];
    data: { price: string; size: string; percentage?: number; type: 'bid' | 'ask' }[];
}

const OrderTable: React.FC<OrderTableProps> = ({ headers, data }) => {
    const theme = useTheme();
    return (
        <div>
            <StyledTable>
                <StyledTableHead>
                    <StyledHeadRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </StyledHeadRow>
                </StyledTableHead>
            </StyledTable>
            <StyledTableContainer theme={theme}>
                <StyledTable>
                    <TableBody>
                        {data.length !== 0
                            ? data.map((row, index) => (
                                  <StyledTableRow key={index} percentage={Number(row.percentage) || 0} type={row.type}>
                                      <TableCell>{row.price}</TableCell>
                                      <TableCell>{row.size}</TableCell>
                                  </StyledTableRow>
                              ))
                            : Array.from({ length: 10 }).map((_, index) => (
                                  <ShimmerRow key={index} theme={theme}>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                  </ShimmerRow>
                              ))}
                    </TableBody>
                </StyledTable>
            </StyledTableContainer>
        </div>
    );
};

export default OrderTable;
