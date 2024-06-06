import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface TopOfBookProps {
    // bestBid: { price: string; size: string };
    // bestAsk: { price: string; size: string };
}

const TopOfBook: React.FC<TopOfBookProps> = () => {
    const { bestBid, bestAsk } = useSelector((state: RootState) => state.orderBook);
    return (
        <Card sx={{ background: 'black' }}>
            <CardContent>
                <Typography variant="h5">Top of Book</Typography>
                <Typography variant="body1">
                    Best Bid: {bestBid?.price} ({bestBid?.size})
                </Typography>
                <Typography variant="body1">
                    Best Ask: {bestAsk?.price} ({bestAsk?.size})
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TopOfBook;
