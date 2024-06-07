import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTopAsks, selectTopBids } from '../../redux/features/selectors.ts';
import OrderTable from '../../components/OrderTable/index.tsx';

const LadderView: React.FC<{}> = () => {
    const topBids = useSelector(selectTopBids);
    const topAsks = useSelector(selectTopAsks);

    const bidHeaders = ['Bid', 'Size'];
    const askHeaders = ['Ask', 'Size'];

    const bidData = topBids.map((bid) => ({ ...bid, type: 'bid' as const, percentage: Number(bid.percentage) }));
    const askData = topAsks.map((ask) => ({ ...ask, type: 'ask' as const, percentage: Number(ask.percentage) }));

    return (
        <Box>
            <OrderTable headers={bidHeaders} data={bidData} />
            <OrderTable headers={askHeaders} data={askData} />
        </Box>
    );
};

export default LadderView;
