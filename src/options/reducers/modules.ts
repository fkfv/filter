import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {connection} from '../connection';
import {RootState} from '../redux/store';
import {ModuleList, ModuleLoad, ModuleUnload} from '../api/module';

import type {AsyncConfig} from '../redux/store'
import type {ModuleListResponsePayload} from '../../common/message/message';


interface ModulesState {
  modules: {
    name: string;
    description: string;
  }[];

  confirmRemove: string|undefined;
}

type ModuleListType = ModuleListResponsePayload['modules'];

const initialState: ModulesState = {
  modules: [],
  confirmRemove: undefined
};

const listModules = createAsyncThunk<ModuleListType, void, AsyncConfig>(
  'modules/list',
  async () => {
    const modules = await ModuleList(connection);

    return modules;
  }
);

const loadModule = createAsyncThunk<string, string, AsyncConfig>(
  'modules/load',
  async (url: string, {getState}) => {
    const connection = selectConnection(getState());
    const name = await ModuleLoad(connection as Connection, url);

    return name;
  }
);

const unloadModule = createAsyncThunk<void, string, AsyncConfig>(
  'modules/unload',
  async (name: string, {getState}) => {
    const connection = selectConnection(getState());
    await ModuleUnload(connection as Connection, name);
  }
);

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setConfirmRemove: (state, action: PayloadAction<string|undefined>) => {
      state.confirmRemove = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(listModules.fulfilled, (state, action) => {
      state.modules = Object.values(action.payload).map((module) => {
        return {
          name: module.name,
          description: module.description ?? module.name
        };
      });
    });
  }
});

const selectModules = (state: RootState) => state.modules.modules;
const selectConfirmRemove = (state: RootState) => state.modules.confirmRemove;

const {setConfirmRemove} = modulesSlice.actions;

export {selectModules, listModules, loadModule, unloadModule, setConfirmRemove,
  selectConfirmRemove};

export default modulesSlice.reducer;
