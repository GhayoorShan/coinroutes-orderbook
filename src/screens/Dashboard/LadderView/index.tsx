import React from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTopAsks, selectTopBids } from '../../../redux/features/selectors.ts.ts';
import OrderTable from '../../../components/OrderTable/index.tsx';
import Dropdown from '../../../components/dropdown/index.tsx';
import { ALLOWED_AGGREGATION } from '../../../utils/constants.ts';
import { RootState } from '../../../redux/store.ts';
import { setAggregation } from '../../../redux/features/orderBookSlice.ts';

const LadderView: React.FC<{}> = () => {
    const topBids = useSelector(selectTopBids);
    const topAsks = useSelector(selectTopAsks);
    const { aggregation } = useSelector((state: RootState) => state.orderBook);

    const bidHeaders = ['Bid', 'Size'];
    const askHeaders = ['Ask', 'Size'];

    const bidData = topBids.map((bid) => ({ ...bid, type: 'bid' as const, percentage: Number(bid.percentage) }));
    const askData = topAsks.map((ask) => ({ ...ask, type: 'ask' as const, percentage: Number(ask.percentage) }));

    const dispatch = useDispatch();
    const handleCurrencyChange = (value: string) => {
        dispatch(setAggregation(Number(value)));
    };
    return (
        <Box>
            <Dropdown options={ALLOWED_AGGREGATION} value={String(aggregation)} onChange={handleCurrencyChange} label={'Aggregation'} />
            <OrderTable headers={bidHeaders} data={bidData} />
            <OrderTable headers={askHeaders} data={askData} />
        </Box>
    );
};

export default LadderView;
