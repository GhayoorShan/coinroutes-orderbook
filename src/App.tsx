import React from 'react';
import { Container, Grid, styled } from '@mui/material';
import useWebSocket from './hooks/useWebSocket';
import TopOfBook from './screens/Dashboard/TopOfBook';
import LadderView from './screens/Dashboard/LadderView';
import Dropdown from './components/dropdown';
import { ALLOWED_CURRENCY, FEED_URL } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setSelectedPair } from './redux/features/currencyPairSlice ';
import { resetOrderBook } from './redux/features/orderBookSlice';
import RealTimeChart from './screens/Dashboard/RealTimeChart';

const CenteredContainer = styled(Container)({
    paddingTop: '50px'
});

const App: React.FC = () => {
    const { currencyPair } = useSelector((state: RootState) => state.currencyPairs);

    const dispatch = useDispatch();
    const handleCurrencyChange = (value: string) => {
        dispatch(setSelectedPair(value));
        dispatch(resetOrderBook());
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

export default App;
