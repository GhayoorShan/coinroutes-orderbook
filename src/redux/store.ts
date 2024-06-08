import { configureStore } from '@reduxjs/toolkit';
import orderBookSlice from './features/orderBookSlice';
import currencyPairSlice from './features/currencyPairSlice ';
import chartSlice from './features/chartSlice';

const store = configureStore({
    reducer: {
        orderBook: orderBookSlice,
        currencyPairs: currencyPairSlice,
        chart: chartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
