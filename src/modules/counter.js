import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";

const INCREMENT_ASYNC = "counter/INCREMENT_ASYNC";
const DECREMENT_ASYNC = "counter/DECREMENT_ASYNC";

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

//마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undifined 두 번째 파라미터로 넣어 준다.
export const incrementAsync = createAction(INCREMENT_ASYNC, () => undefined);
export const decrementAsync = createAction(DECREMENT_ASYNC, () => undefined);

function* incrementSaga() {
  yield delay(1000); //1초를 기다린다.
  yield put(increment()); // 특정 액션을 디스패치 한다.
}

function* decrementSaga() {
  yield delay(1000);
  yield put(decrement());
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해 준다.
  yield takeEvery(INCREMENT_ASYNC, incrementSaga);
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
  // 가장 마지막으로 실행된 작업만 수행한다.
  yield takeLatest(DECREMENT_ASYNC, decrementSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREMENT]: state => state + 1,
    [DECREMENT]: state => state - 1
  },
  initialState
);

export default counter;
