import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    price: string;
    size: string;
    percentage?: number | string;
}

interface OrderBookState {
    bids: Record<string, string>;
    asks: Record<string, string>;
    bestBid: Order | null;
    bestAsk: Order | null;
    topBids: Order[];
    topAsks: Order[];
    priceData: { time: string; price: number }[];
    aggregation: number;
}

const initialState: OrderBookState = {
    bids: {},
    asks: {},
    bestBid: null,
    bestAsk: null,
    priceData: [],
    topBids: [],
    topAsks: [],
    aggregation: 0.01 // Default aggregation level
};

const aggregatePrice = (price: number, aggregation: number): number => {
    return Math.floor(price / aggregation) * aggregation;
};

const getTopOrdersWithPercentage = (orders: Record<string, string>, topN: number, isAscending: boolean, aggregation: number): Order[] => {
    let aggregatedOrders: Record<string, number> = {};

    // Aggregate orders based on the current aggregation level
    for (const [price, size] of Object.entries(orders)) {
        const aggregatedPrice = aggregatePrice(Number(price), aggregation).toFixed(2);
        if (aggregatedOrders[aggregatedPrice]) {
            aggregatedOrders[aggregatedPrice] += Number(size);
        } else {
            aggregatedOrders[aggregatedPrice] = Number(size);
        }
    }

    let topOrders = Object.entries(aggregatedOrders)
        .map(([price, size]) => ({ price, size: size.toString() }))
        .sort((a, b) => (isAscending ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)))
        .slice(0, topN);

    const totalSize = topOrders.reduce((sum, order) => sum + Number(order.size), 0);

    topOrders = topOrders.sort((a, b) => Number(b.size) - Number(a.size));
    return topOrders.map((order) => ({
        ...order,
        size: Number(order.size).toPrecision(8), // Limit size to 8 significant digits
        percentage: totalSize > 0 ? ((Number(order.size) / totalSize) * 100).toFixed(2) : '0.00' // Limit percentage to 2 decimal places
    }));
};

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    reducers: {
        setOrderBookSnapshot(state, action: PayloadAction<{ bids: [string, string][]; asks: [string, string][] }>) {
            state.bids = Object.fromEntries(action.payload.bids);
            state.asks = Object.fromEntries(action.payload.asks);
            state.topBids = getTopOrdersWithPercentage(state.bids, 10, false, state.aggregation);
            state.topAsks = getTopOrdersWithPercentage(state.asks, 10, true, state.aggregation);
        },
        updateOrderBook(state, action: PayloadAction<[string, string, string][]>) {
            action.payload.forEach(([side, price, size]) => {
                const priceKey = price.toString();

                if (side === 'buy') {
                    if (Number(size) === 0) {
                        console.log('deleting', side, price, size);

                        delete state.bids[priceKey];
                    } else {
                        state.bids[priceKey] = size;
                    }
                } else if (side === 'sell') {
                    if (Number(size) === 0) {
                        console.log('deleting', side, price, size);

                        delete state.asks[priceKey];
                    } else {
                        state.asks[priceKey] = size;
                    }
                }
            });
            state.topBids = getTopOrdersWithPercentage(state.bids, 10, false, state.aggregation);
            state.topAsks = getTopOrdersWithPercentage(state.asks, 10, true, state.aggregation);
        },
        addPriceData(state, action: PayloadAction<{ time: string; price: number }>) {
            state.priceData.push(action.payload);
        },
        setBestBid(state, action: PayloadAction<Order>) {
            state.bestBid = action.payload;
        },
        setBestAsk(state, action: PayloadAction<Order>) {
            state.bestAsk = action.payload;
        },
        resetOrderBook(state) {
            return initialState;
        },
        clearPriceData(state) {
            state.priceData = [];
        },
        setAggregation(state, action: PayloadAction<number>) {
            state.aggregation = action.payload;
            // Update top orders with new aggregation
            state.topBids = getTopOrdersWithPercentage(state.bids, 10, false, state.aggregation);
            state.topAsks = getTopOrdersWithPercentage(state.asks, 10, true, state.aggregation);
        }
    }
});

export const { setOrderBookSnapshot, updateOrderBook, addPriceData, setBestBid, setBestAsk, resetOrderBook, clearPriceData, setAggregation } =
    orderBookSlice.actions;

export default orderBookSlice.reducer;
