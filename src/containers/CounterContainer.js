import React from "react";
import { connect } from "react-redux";
import { incrementAsync, decrementAsync } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({ number, incrementAsync, decrementAsync }) => {
  return (
    <Counter
      number={number}
      onIncrement={incrementAsync}
      onDecrement={decrementAsync}
    />
  );
};

export default connect(
  state => ({
    number: state.counter
  }),
  {
    incrementAsync,
    decrementAsync
  }
)(CounterContainer);
