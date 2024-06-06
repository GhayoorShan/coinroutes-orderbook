// src/App.tsx
import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useWebSocket from './hooks/useWebSocket';
import TopOfBook from './screens/Dashboard/TopOfBook';
import LadderView from './screens/Dashboard/LadderView';

const App: React.FC = () => {
    const [currencyPair, setCurrencyPair] = useState('BTC-USD');

    const { isConnected } = useWebSocket({
        url: `wss://ws-feed.pro.coinbase.com`,
        currencyPair
    });
    console.log(isConnected);

    return (
        <Container>
            <FormControl fullWidth margin="normal">
                <InputLabel id="currency-pair-label">Currency Pair</InputLabel>
                <Select labelId="currency-pair-label" value={currencyPair} onChange={(e) => setCurrencyPair(e.target.value)}>
                    <MenuItem value="BTC-USD">BTC-USD</MenuItem>
                    <MenuItem value="ETH-USD">ETH-USD</MenuItem>
                    <MenuItem value="LTC-USD">LTC-USD</MenuItem>
                    <MenuItem value="BCH-USD">BCH-USD</MenuItem>
                </Select>
            </FormControl>
            <TopOfBook />
            <LadderView />
            {/* <PriceChart data={priceData} /> */}
        </Container>
    );
};

export default App;
