import React from "react";

const Counter = ({ number, onIncrement, onDecrement }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrement}>+1</button>
      <button onClick={onDecrement}>-1</button>
    </div>
  );
};

export default Counter;
