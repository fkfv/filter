import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {connection} from '../connection';
import {RootState} from '../redux/store';
import {OptionList, OptionGet, OptionSet} from '../api/option';

import type {OptionListOption} from '../../common/message/message';
import type {AsyncConfig} from '../redux/store';


interface OptionState {
  options: {
    [categoryName: string]: {
      [optionName: string]: OptionListOption;
    }
  };

  module?: string;

  optionValues: {
    [optionName: string]: boolean|string|number;
  }
}

type ValueType = boolean|string|number;
type NameValueType = {
  name: string;
  value: ValueType;
};

const initialState: OptionState = {
  options: {},
  optionValues: {}
};

const listOptions = createAsyncThunk<
  {
    [categoryName: string]: {
      [optionName: string]: OptionListOption;
    }
  }, void, {
    state: RootState;
  }
>(
  'option/list',
  async (_, {getState, dispatch}) => {
    const module = selectModule(getState()) as string;
    const options = await OptionList(connection, module);

    Object.values(options).forEach(category => {
      Object.keys(category).forEach(option => {
        dispatch(getOption(option));
      })
    })

    return options;
  }
);

const getOption = createAsyncThunk<NameValueType, string, AsyncConfig>(
  'option/get',
  async (name, {getState}) => {
    const module = selectModule(getState()) as string;
    const value = await OptionGet(connection, module, name);

    return {name, value};
  }
);

const setOption = createAsyncThunk<NameValueType, NameValueType, AsyncConfig>(
  'option/set',
  async ({name, value}, {getState}) => {
    const module = selectModule(getState()) as string;

    await OptionSet(connection, module, name, value);
    return {name, value};
  }
);

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    setModule: (state, action: PayloadAction<string>) => {
      state.module = action.payload;
      state.options = {};
      state.optionValues = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(listOptions.fulfilled, (state, action) => {
      state.options = action.payload;

      Object.values(action.payload).forEach(category => {
        Object.entries(category).forEach(([name, option]) => {
          state.optionValues[name] = option.defaultValue;
        });
      })
    });

    builder.addCase(getOption.fulfilled, (state, action) => {
      const {name, value} = action.payload;
      state.optionValues[name] = value;
    });

    builder.addCase(setOption.fulfilled, (state, action) => {
      const {name, value} = action.payload;
      state.optionValues[name] = value;
    });
  }
});

const selectModule = (state: RootState) => state.option.module;

const selectOptions = (state: RootState) => {
  const options = Object.entries(state.option.options);

  return Object.fromEntries(options.map(([category, option]) => {
    const mappedOptions = Object.entries(option).map(([name, attributes]) => {
      return [name, {
        ...attributes,
        value: selectOptionValue(state, name)
      }];
    });

    return [category, Object.fromEntries(mappedOptions)];
  }));
};

const selectOptionValue = (state: RootState, name: string) =>
  state.option.optionValues[name];

const selectOption = (state: RootState, name: string) => {
  const options = Object.assign({}, ...Object.values(selectOptions(state)));

  return options[name];
};

const {setModule} = optionSlice.actions;

export {listOptions, getOption, setOption, setModule, selectModule,
  selectOptions, selectOption};
export default optionSlice.reducer;
