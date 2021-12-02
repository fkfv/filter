import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {connection} from '../connection';
import {RootState} from '../redux/store';
import {ModuleList} from '../api/module';

import type {AsyncConfig} from '../redux/store'
import type {ModuleListResponsePayload} from '../../common/message/message';


interface ModulesState {
  modules: {
    name: string;
    description: string;
  }[];
}

type ModuleListType = ModuleListResponsePayload['modules'];

const initialState: ModulesState = {
  modules: []
};

const listModules = createAsyncThunk<ModuleListType, void, AsyncConfig>(
  'modules/list',
  async () => {
    const modules = await ModuleList(connection);

    return modules;
  }
);

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listModules.fulfilled, (state, action) => {
      state.modules = Object.values(action.payload).map((module) => {
        return {
          name: module.name,
          description: module.description ?? module.name,
          active: module.active
        };
      }).filter(module => module.active);
    });
  }
});

const selectModules = (state: RootState) => state.modules.modules;

export {selectModules, listModules};

export default modulesSlice.reducer;
