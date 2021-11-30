import React from 'react';
import {v4 as uuid} from 'uuid';

import {css} from '@emotion/css';

import OptionControl from './control';

import {useAppSelector} from '../../redux/hooks';
import {selectOptions, selectModule} from '../../reducers/option';

import type {OptionListOption} from '../../../common/message/message';


const CategoryHeaderStyle = css({
  fontWeight: 300,
  padding: '5px',
  paddingTop: '2px',
  borderTop: '2px solid #ebebeb'
});

const OptionValue = (name: string) => {
  return (
    <OptionControl
      key={name}
      name={name}
    />
  );
};

const OptionCategory = ([category, options]: [string, {
  [optionName: string]: OptionListOption;
}]) => {
  return (
    <React.Fragment
      key={category}
    >
      <h2
        key={uuid()}
        className={CategoryHeaderStyle}
      >{category}</h2>
      {Object.keys(options).map(OptionValue)}
    </React.Fragment>
  );
};

const Options = () => {
  const options = useAppSelector(selectOptions);
  const activeModule = useAppSelector(selectModule);

  if (typeof activeModule === 'undefined') {
    return (
      <h2
        className={CategoryHeaderStyle}
      >
        Select a module to see its options.
      </h2>
    );
  }

  if (Object.keys(options).length === 0) {
    return (
      <h2
        className={CategoryHeaderStyle}
      >
        This module has no options.
      </h2>
    );
  }

  return (
    <React.Fragment>
      {Object.entries(options).map(OptionCategory)}
    </React.Fragment>
  );
}

export default Options;
