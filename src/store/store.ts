import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { counterReducer } from "@store/modules/counter";

import { kanyeReducer } from "@store/modules/kanye";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    kanyeQuote: kanyeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
