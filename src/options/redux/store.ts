import logger from 'redux-logger';

import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import modulesReducer from '../reducers/modules';
import optionReducer from '../reducers/option';


const store = configureStore({
  reducer: {
    modules: modulesReducer,
    option: optionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
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
