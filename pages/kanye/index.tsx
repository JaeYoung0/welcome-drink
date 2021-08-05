import React from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getKanyeQuote, selectkanyeQuote } from "@store/modules/kanye";

function KanyePage() {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector(selectkanyeQuote);

  return (
    <div>
      {/* <CustomModal /> */}
      <h1>칸예가 또 무슨 말을...</h1>
      {pending && <p>Loading...</p>}
      {data && <p>{data.quote}</p>}
      {error && <p>Oops, something went wrong</p>}
      <h3>버튼을 클릭해주세요</h3>
      <button
        onClick={() => {
          dispatch(getKanyeQuote());
        }}
        disabled={pending}
      >
        Generate Kanye Quote
      </button>
    </div>
  );
}

export default KanyePage;
