import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const selectModal = (state: RootState) => state.modal;
// export const countSelector = createSelector(selectCount, (state) => state);
