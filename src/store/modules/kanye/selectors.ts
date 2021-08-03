import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const selectkanyeQuote = (state: RootState) => state.kanyeQuote;
export const kanyeQuoteSelector = createSelector(
  selectkanyeQuote,
  (state) => state
);
