import React from 'react';
import { Card, CardContent, Grid, Typography, styled } from '@mui/material';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)({
    background: '#1c1c1c', // Dark grey background for the card
    color: 'white',
    margin: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)', // Lighter shadow for better contrast
    borderRadius: '10px',
    width: '300px'
});

const TopOfBook: React.FC<{}> = () => {
    const { bestBid, bestAsk } = useSelector((state: RootState) => state.orderBook);
    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Best Bids
                        </Typography>
                        <Typography variant="body1">price: {bestBid?.price}</Typography>
                        <Typography variant="body1">Size: {bestAsk?.size}</Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Best Asks
                        </Typography>
                        <Typography variant="body1">Price: {bestBid?.price}</Typography>
                        <Typography variant="body1">Size: {bestAsk?.size}</Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    );
};

export default TopOfBook;
