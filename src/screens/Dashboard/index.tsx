import React from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedPair } from '../../redux/features/currencyPairSlice ';
import { resetOrderBook } from '../../redux/features/orderBookSlice';
import { resetBestBids } from '../../redux/features/chartSlice';
import useWebSocket from '../../hooks/useWebSocket';
import { ALLOWED_CURRENCY, FEED_URL } from '../../utils/constants';
import Dropdown from '../../components/dropdown';
import TopOfBook from './TopOfBook';
import RealTimeChart from './RealTimeChart';
import LadderView from './LadderView';
import { CenteredContainer } from './styles';

const Dashboard: React.FC = () => {
    const { currencyPair } = useSelector((state: RootState) => state.currencyPairs);

    const dispatch = useDispatch();
    const handleCurrencyChange = (value: string) => {
        dispatch(setSelectedPair(value));
        dispatch(resetOrderBook());
        dispatch(resetBestBids());
    };

    const { isConnected } = useWebSocket({
        url: FEED_URL,
        currencyPair
    });
    console.log(isConnected);

    return (
        <CenteredContainer>
            <Dropdown options={ALLOWED_CURRENCY} value={currencyPair} onChange={handleCurrencyChange} label="Currency pair" />
            <Grid container direction="row" justifyContent={'space-between'} pt={2}>
                <Grid>
                    <TopOfBook />
                    <RealTimeChart />
                </Grid>
                <Grid>
                    <LadderView />
                </Grid>
            </Grid>
        </CenteredContainer>
    );
};

export default Dashboard;
