import { configureStore } from '@reduxjs/toolkit';
import orderBookSlice from './features/orderBookSlice';
import currencyPairSlice from './features/currencyPairSlice ';

const store = configureStore({
    reducer: {
        orderBook: orderBookSlice,
        currencyPairs: currencyPairSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
