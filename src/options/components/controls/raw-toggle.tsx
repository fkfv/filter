import React from 'react';

import {css} from '@emotion/css';


type RawToggleProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
};

const RawToggleStyle = css({
  display: 'block',
  overflow: 'hidden',

  '& > input': {
    display: 'none',

    ':checked': {
      '& + label': {
        background: '#1ed44e',

        ':after': {
          left: 'calc(100% - 24px)'
        }
      }
    }
  },

  '& > label': {
    cursor: 'pointer',
    textIndent: '-9999px',
    width: '48px',
    height: '26px',
    background: '#808080',
    display: 'block',
    borderRadius: '30px',
    position: 'relative',

    ':after': {
      content: '""',
      position: 'absolute',
      top: '3px',
      left: '4px',
      width: '20px',
      height: '20px',
      background: '#ffffff',
      borderRadius: '90px',
      transition: '300ms'
    }
  }
});

const RawToggle: React.FunctionComponent<RawToggleProps> = ({
  id,
  ...props
}) => {
  return (
    <div
      className={RawToggleStyle}
    >
      <input
        type="checkbox"
        id={id}
        {...props}
      />
      <label htmlFor={id}>Toggle</label>
    </div>
  );
};

export default RawToggle;
export type {RawToggleProps};
