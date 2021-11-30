import React from 'react';

import {css, cx} from '@emotion/css';


type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  width?: "auto"|"full";
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

const Input: React.FunctionComponent<InputProps> = ({
  label,
  width,
  ...props
}) => {
  const styles = cx({
    [InputStyle]: true,
    [FullInputStyle]: width === 'full'
  });

  return (
    <label
      className={styles}
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
