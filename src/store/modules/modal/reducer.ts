import { createReducer } from "@reduxjs/toolkit";
import {
  openModal,
  confirmModal,
  declineModal,
  openAsyncModal,
} from "./actions";

interface ModalState {
  isOpened: boolean;
  isConfirmed: boolean;
  isDeclined: boolean;
  title: string;
}

const initialState: ModalState = {
  isOpened: false,
  isConfirmed: false,
  isDeclined: false,
  title: "",
};

export const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openModal, (state, { payload }) => {
      state.isOpened = true;
      state.isConfirmed = false;
      state.isDeclined = false;
      state.title = payload;
    })
    .addCase(confirmModal, (state) => {
      state.isOpened = false;
      state.isConfirmed = true;
      state.isDeclined = false;
    })
    .addCase(declineModal, (state) => {
      state.isOpened = false;
      state.isConfirmed = false;
      state.isDeclined = true;
    });
});
