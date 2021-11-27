import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import Connection from '../../common/messaging/connection';

import {RootState} from '../redux/store';


interface ConnectionState {
  connection: Connection|undefined;
}

const initialState: ConnectionState = {
  connection: undefined
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Connection>) => {
      state.connection = action.payload;
    }
  }
});

const selectConnection = (state: RootState) => state.connection.connection;
const {set} = connectionSlice.actions;

export {selectConnection, set};
export default connectionSlice.reducer;
