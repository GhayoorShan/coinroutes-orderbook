import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    price: string;
    size: string;
}

interface OrderBookState {
    bids: { [key: string]: string };
    asks: { [key: string]: string };
    bestBid: Order | null;
    bestAsk: Order | null;
    priceData: { time: string; price: number }[];
}

const initialState: OrderBookState = {
    bids: {},
    asks: {},
    bestBid: null,
    bestAsk: null,
    priceData: []
};

const updateOrders = (orders: Order[], changes: [string, string, string][]) => {
    changes.forEach(([side, price, size]) => {
        const order = { price, size };
        // const orderIndex = orders.findIndex((o) => o.price === price);
        orders.push(order);

        // if (size === '0') {
        //     // Remove the order
        //     if (orderIndex > -1) {
        //         orders.splice(orderIndex, 1);
        //     }
        // } else if (orderIndex > -1) {
        //     // Update the existing order
        //     orders[orderIndex] = order;
        // } else {
        //     // Add the new order
        //     orders.push(order);
        // }
    });
};

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    reducers: {
        setOrderBookSnapshot(state, action: PayloadAction<{ bids: [string, string][]; asks: [string, string][] }>) {
            const bids: { [key: string]: string } = {};
            const asks: { [key: string]: string } = {};
            action.payload.bids.forEach(([price, size]) => {
                bids[price] = size;
            });

            state.bids = bids;

            action.payload.asks.forEach(([price, size]) => {
                asks[price] = size;
            });

            state.asks = asks;

            console.log(state.bids);
            // state.bids = action.payload.bids.map(([price, size]) => ({ price, size }));
            // state.asks = action.payload.asks.map(([price, size]) => ({ price, size }));
            // if (state.bids.length > 0) {
            //     state.bestBid = state.bids[0];
            // }
            // if (state.asks.length > 0) {
            //     state.bestAsk = state.asks[0];
            // }
        },
        updateOrderBook(state, action: PayloadAction<[string, string, string][]>) {
            const changes = action.payload;
            console.log('changes', changes);

            // changes.forEach(([side, price, size]) => {
            //     if (side === 'buy') {
            //         state.bids[price] = size;
            //     } else {
            //         state.asks[price] = size;
            //     }
            // });

            //update orders
            changes.forEach(([side, price, size]) => {
                if (side === 'buy') {
                    if (Number(size) === 0) {
                        console.log('buy size 0');
                        delete state.bids[price];
                    } else {
                        state.bids[price] = size;
                    }
                } else if (side === 'sell') {
                    if (Number(size) === 0) {
                        console.log('sell size 0');

                        delete state.asks[price];
                    } else {
                        state.asks[price] = size;
                    }
                }
            });

            // updateOrders(state.bids, changes.filter(([side]) => side === 'buy'));

            // const bidsChanges = changes.filter(([side]) => side === 'buy');
            // const asksChanges = changes.filter(([side]) => side === 'sell');

            // updateOrders(state.bids, bidsChanges);
            // updateOrders(state.asks, asksChanges);

            // // Sort bids in descending order and asks in ascending order
            // state.bids.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            // state.asks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

            // if (state.bids.length > 0) {
            //     state.bestBid = state.bids[0];
            // }
            // if (state.asks.length > 0) {
            //     state.bestAsk = state.asks[0];
            // }
        },
        addPriceData(state, action: PayloadAction<{ time: string; price: number }>) {
            state.priceData.push(action.payload);
        },
        setBestBid(state, action: PayloadAction<Order>) {
            state.bestBid = action.payload;
        },
        setBestAsk(state, action: PayloadAction<Order>) {
            state.bestAsk = action.payload;
        }
    }
});

export const { setOrderBookSnapshot, updateOrderBook, addPriceData, setBestBid, setBestAsk } = orderBookSlice.actions;

export default orderBookSlice.reducer;
