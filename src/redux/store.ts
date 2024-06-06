import { configureStore } from "@reduxjs/toolkit";
import orderBookSlice from "./features/orderBookSlice";

const store = configureStore({
  reducer: {
    orderBook: orderBookSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
