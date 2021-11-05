import React from 'react';

import {css} from '@emotion/css';

import RawToggle from './raw-toggle';

import type {RawToggleProps} from './raw-toggle';


type ToggleProps = RawToggleProps;

const ToggleStyle = css({
  display: 'flex',
  alignItems: 'center',

  '& > div': {
    marginRight: '5px'
  },

  '& > label': {
    fontSize: '1.2em',
    fontWeight: 300
  }
});

const Toggle: React.FunctionComponent<ToggleProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      className={ToggleStyle}
    >
      <RawToggle {...props}/>
      <label>{children}</label>
    </div>
  );
};

export default Toggle;
