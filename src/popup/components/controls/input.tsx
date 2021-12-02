import React from 'react';

import {css} from '@emotion/css';


type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const InputStyle = css({
  marginBottom: '15px',
  position: 'relative',
  borderBottom: '1px solid #dddddd',
  flexBasis: '80%',

  '& > input': {
    width: '100%',
    padding: '10px 0',
    marginTop: '20px',
    border: 'none',
    outline: 'none',

    '::placeholder': {
      opacity: 0
    }
  },

  '& > span': {
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'translateY(30px)',
    fontSize: '0.825em',
    fontWeight: 300,
    transitionDuration: '300ms'
  },

  ':focus-within > span, & > input:not(:placeholder-shown) + span': {
    transform: 'translateY(0)'
  }
});

const Input = ({
  label,
  ...props
}: InputProps) => {
  return (
    <label
      className={InputStyle}
    >
      <input
        placeholder={label}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

export default Input;
