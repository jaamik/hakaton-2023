import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu.slice';

const store = configureStore({
  reducer: {
    food: menuReducer
  },
})
export default store;