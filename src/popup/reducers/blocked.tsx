import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {connection} from '../connection';
import {RootState} from '../redux/store';
import {BlockedList, BlockedBlocked, BlockedAdd,
  BlockedRemove} from '../api/blocked';

import type {AsyncConfig} from '../redux/store'


type Blockable = {
  id: string;
  name: {
    singular: string;
    plural: string;
  };
  description: string;
};

interface BlockedState {
  module: string|undefined;
  blockables: Blockable[];
  selectedBlockable: Blockable|undefined;
  contentList: string[];
}

const initialState: BlockedState = {
  module: undefined,
  blockables: [],
  selectedBlockable: undefined,
  contentList: []
};

const listBlockables = createAsyncThunk<Blockable[], void, AsyncConfig>(
  'blocked/blockables/list',
  async (_, {getState}) => {
    const module = selectModule(getState()) as string;
    const blockables = await BlockedList(connection, module);

    return blockables;
  }
);

const listBlocked = createAsyncThunk<string[], void, AsyncConfig>(
  'blocked/blocked/list',
  async (_, {getState}) => {
    const module = selectModule(getState()) as string;
    const blockable = selectBlockable(getState()) as Blockable;
    const blocked = await BlockedBlocked(connection, module, blockable.id);

    return blocked;
  }
);

const addBlocked = createAsyncThunk<string, string, AsyncConfig>(
  'blocked/blocked/add',
  async (block: string, {getState}) => {
    const module = selectModule(getState()) as string;
    const blockable = selectBlockable(getState()) as Blockable;

    await BlockedAdd(connection, module, blockable.id, block);
    return block;
  }
);

const removeBlocked = createAsyncThunk<string, string, AsyncConfig>(
  'blocked/blocked/remove',
  async (block: string, {getState}) => {
    const module = selectModule(getState()) as string;
    const blockable = selectBlockable(getState()) as Blockable;

    await BlockedRemove(connection, module, blockable.id, block);
    return block;
  }
);

const blockedSlice = createSlice({
  name: 'blocked',
  initialState,
  reducers: {
    setModule: (state, action) => {
      state.module = action.payload;
    },
    setSelectedBlockable: (state, action) => {
      state.selectedBlockable = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(listBlockables.fulfilled, (state, action) => {
      state.blockables = action.payload;
      state.selectedBlockable = state.blockables[0];
    });
    builder.addCase(listBlocked.fulfilled, (state, action) => {
      state.contentList = action.payload;
    });
    builder.addCase(addBlocked.fulfilled, (state, action) => {
      const index = state.contentList.indexOf(action.payload);

      if (index === -1) {
        state.contentList.push(action.payload);
      }
    });
    builder.addCase(removeBlocked.fulfilled, (state, action) => {
      const index = state.contentList.indexOf(action.payload);

      if (index !== -1) {
        state.contentList.splice(index, 1);
      }
    });
  }
});

const selectModule = (state: RootState) => state.blocked.module;
const selectBlockables = (state: RootState) => state.blocked.blockables;
const selectBlockable = (state: RootState) => state.blocked.selectedBlockable;
const selectBlocked = (state: RootState) => state.blocked.contentList;

const {setModule, setSelectedBlockable} = blockedSlice.actions;

export {listBlockables, listBlocked, addBlocked, removeBlocked};
export {selectModule, selectBlockables, selectBlockable, selectBlocked,
  setModule, setSelectedBlockable};

export default blockedSlice.reducer;
