import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
// import { confirmationModalActions } from '../slice';

import { AppDispatch } from "@store/store";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import {
  selectModal,
  openModal,
  confirmModal,
  declineModal,
  openAsyncModal,
} from "@store/modules/modal";

function useModal() {
  //   const dispatch: AppDispatch = useDispatch();
  const dispatch: AppDispatch = useAppDispatch();
  const { isOpened, isDeclined, isConfirmed, title } =
    useAppSelector(selectModal);

  const open = (title: string) => dispatch(openModal(title));

  const openCustomModal = async (title: string) => {
    const { payload } = await dispatch(openAsyncModal(title));
    console.log("@@payload", payload);

    return payload;
  };

  const confirm = () => {
    return dispatch(confirmModal());
  };

  const decline = () => {
    return dispatch(declineModal());
  };

  return {
    isOpened,
    open,
    confirm,
    decline,
    isConfirmed,
    isDeclined,
    title,
    openCustomModal,
  };
}

export default useModal;
