import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {connection} from '../connection';
import {RootState} from '../redux/store';
import {setModule} from './option';
import {ModuleList, ModuleActivate, ModuleDeactivate, ModuleAdd,
  ModuleRemove} from '../api/module';

import type {AsyncConfig} from '../redux/store'
import type {ModuleListResponsePayload} from '../../common/message/message';


interface ModulesState {
  modules: {
    name: string;
    description: string;
    active: boolean;
  }[];

  addErrorMessage: string|undefined;
  confirmRemove: string|undefined;
}

type ModuleListType = ModuleListResponsePayload['modules'];

const initialState: ModulesState = {
  modules: [],
  addErrorMessage: undefined,
  confirmRemove: undefined
};

const listModules = createAsyncThunk<ModuleListType, void, AsyncConfig>(
  'modules/list',
  async () => {
    const modules = await ModuleList(connection);

    return modules;
  }
);

const activateModule = createAsyncThunk<void, string, AsyncConfig>(
  'modules/activate',
  async (name, {dispatch}) => {
    await ModuleActivate(connection, name);

    dispatch(listModules());
  }
);

const deactivateModule = createAsyncThunk<void, string, AsyncConfig>(
  'modules/deactivate',
  async (name, {dispatch}) => {
    await ModuleDeactivate(connection, name);

    dispatch(listModules());
  }
);

const addModule = createAsyncThunk<void, string, AsyncConfig>(
  'modules/add',
  async (url, {dispatch}) => {
    const module = await ModuleAdd(connection, url);

    dispatch(setModule(module));
    dispatch(listModules());
  }
);

const removeModule = createAsyncThunk<void, string, AsyncConfig>(
  'modules/remove',
  async (name, {dispatch}) => {
    await ModuleRemove(connection, name);

    dispatch(listModules());
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
          description: module.description ?? module.name,
          active: module.active
        };
      });
    });
    builder.addCase(addModule.pending, (state, _) => {
      state.addErrorMessage = undefined;
    });
    builder.addCase(addModule.rejected, (state, action) => {
      state.addErrorMessage = action.error.message;
    });
  }
});

const selectModules = (state: RootState) => state.modules.modules;
const selectConfirmRemove = (state: RootState) => state.modules.confirmRemove;
const selectErrorMessage = (state: RootState) => state.modules.addErrorMessage;

const {setConfirmRemove} = modulesSlice.actions;

export {selectModules, listModules, activateModule, deactivateModule,
  addModule, removeModule, setConfirmRemove, selectConfirmRemove,
  selectErrorMessage};

export default modulesSlice.reducer;
