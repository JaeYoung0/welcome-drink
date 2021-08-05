import { createAction, createAsyncThunk, Store } from "@reduxjs/toolkit";
import { RootState, store } from "@store/store";

interface ThunkExtraArguments {
  store: Store;
}

export const openModal = createAction<string>("modal/openModal");
export const confirmModal = createAction("modal/confirmModal");
export const declineModal = createAction("modal/declineModal");

export const openAsyncModal = createAsyncThunk<boolean, any, {}>(
  "modal/openAsyncModal",
  async (title: string, { dispatch, getState }) => {
    dispatch(openModal(`${title}`));

    return await new Promise((resolve, reject) => {
      // rootstate가 바뀌고나면, subscribe의 listener가 작동한다.
      store.subscribe(() => {
        const { modal } = getState() as RootState;
        if (modal.isConfirmed) {
          resolve(true);
        }
        if (modal.isDeclined) {
          resolve(false);
        }
      });
    });
  }
);
