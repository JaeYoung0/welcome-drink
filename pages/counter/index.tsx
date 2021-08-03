import React from "react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
} from "@store/modules/counter";

function CounterPage() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  const [incrementAmount, setIncrementAmount] = useState(0);

  return (
    <div>
      <h1>지금 숫자는 {count}</h1>

      <div>
        <input
          type='number'
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment By Amount
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          increment
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          decrement
        </button>
      </div>
    </div>
  );
}

export default CounterPage;
