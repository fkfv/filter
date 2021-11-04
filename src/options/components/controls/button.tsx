import React from 'react';

import {css, cx} from '@emotion/css';


type ButtonProps = React.PropsWithChildren<{
  color: "red"|"green";
  position?: "normal"|"close"|"sidebar"|"action"|unknown;
  children: React.ReactNode;

  onClick?: ((event: React.SyntheticEvent) => void);
}>;

const ButtonStyle = css({
  padding: '10px',
  fontSize: '1em',
  borderRadius: '2px',
  backgroundColor: '#f7f7f7',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: '#f2f2f2'
  },

  ':active': {
    transform: 'translate(1px, 1px)'
  }
});

const RedButtonStyle = css({
  border: '1px solid #ff0000'
});

const GreenButtonStyle = css({
  border: '1px solid #008000'
});

const CloseButton = css({
  width: '25px',
  height: '25px',
  padding: '0 !important',
  fontSize: '1.5em !important'
});

const SidebarButton = css({
  width: '35px',
  height: '35px',
  fontSize: '1.5em !important',
  padding: '0 !important',
  marginLeft: '5px'
});

const ActionButton = css({
  width: '45px',
  height: '45px',
  fontSize: '1.5em !important',
  padding: '0 !important',
  marginRight: '10px',
});

const Button = ({
  color,
  position,
  children,
  ...props
}: ButtonProps) => {
  const styles = cx({
    [ButtonStyle]: true,
    [RedButtonStyle]: color === 'red',
    [GreenButtonStyle]: color === 'green',
    [CloseButton]: position === 'close',
    [SidebarButton]: position === 'sidebar',
    [ActionButton]: position === 'action'
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
