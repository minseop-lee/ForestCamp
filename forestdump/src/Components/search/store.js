// store.js
import { createStore } from 'redux';

// 초기 상태 정의
const initialState = {
  fastsearch: [],
};

// 리듀서 함수 정의
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FASTSEARCH':
      return {
        ...state,
        fastsearch: action.payload,
      };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(rootReducer);

export default store;
