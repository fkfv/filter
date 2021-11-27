import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import connectionReducer from '../reducers/connection';
import modulesReducer from '../reducers/modules';
import optionReducer from '../reducers/option';


const store = configureStore({
  reducer: {
    connection: connectionReducer,
    modules: modulesReducer,
    option: optionReducer
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

type AsyncConfig = {
  state: RootState;
};

export {store};
export type {AppDispatch, RootState, AppThunk, AsyncConfig};
