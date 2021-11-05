import React from 'react';

import {css} from '@emotion/css';


type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
}

const SelectStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '& > label': {
    fontSize: '1.2em',
    fontWeight: 300
  },

  '& > select': {
    marginLeft: '5px',
    fontSize: '1em',
    fontWeight: 300,
    padding: '5px'
  }
});

const Select: React.FunctionComponent<SelectProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <div
      className={SelectStyle}
    >
      <label>{label}</label>
      <select
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
