import React from 'react';
import { Card, CardContent, Grid, Typography, styled } from '@mui/material';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)({
    background: '#1c1c1c',
    color: 'white',
    margin: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)',
    width: '300px'
});

const TopOfBook: React.FC<{}> = () => {
    const { bestBidCurrent, bestAskCurrrent } = useSelector((state: RootState) => state.orderBook);

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom color={'#2ECC71'}>
                            Best Bids
                        </Typography>
                        <Typography variant="body1">price: {bestBidCurrent?.price || 0}</Typography>
                        <Typography variant="body1">Size: {bestAskCurrrent?.size || 0}</Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom color={'#F44336'}>
                            Best Asks
                        </Typography>
                        <Typography variant="body1">Price: {bestBidCurrent?.price || 0}</Typography>
                        <Typography variant="body1">Size: {bestAskCurrrent?.size || 0}</Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    );
};

export default TopOfBook;
