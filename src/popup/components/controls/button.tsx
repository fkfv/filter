import React from 'react';

import {css, cx} from '@emotion/css';


type ButtonProps = React.PropsWithChildren<{
  color: "red"|"green";

  onClick?: ((event: React.SyntheticEvent) => void);
}>;

const ButtonStyle = css({
  fontSize: '1em',
  cursor: 'pointer',
  backgroundColor: '#f7f7f7'

  ':hover': {
    backgroundColor: '#f2f2f2'
  },

  ':active': {
    transform: 'translate(1px, 1px)'
  }
});

const RedButtonStyle = css({
  width: '25px',
  height: '25px',
  borderRadius: '25px',
  padding: '0',
  margin: '5px',
  border: '1px solid #ff0000'
});

const GreenButtonStyle = css({
  height: '35px',
  padding: '10px 0',
  marginLeft: '5px',
  border: '1px solid #008000',
  borderRadius: '2px'
});

const Button = ({
  color,
  children,
  ...props
}: ButtonProps) => {
  const styles = cx({
    [ButtonStyle]: true,
    [RedButtonStyle]: color === 'red',
    [GreenButtonStyle]: color === 'green'
  });

  return (
    <button
      type="button"
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
