import React from 'react';

import {css} from '@emotion/css';


const SidebarHeaderStyle = css({
  padding: '10px',
  display: 'flex',
  fontWeight: 300,
  alignItems: 'center',
  fontSize: '2em',
  backgroundColor: '#3d3d3d',
  color: '#ededed',
  flexBasis: '20%'
});

const SidebarHeader: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={SidebarHeaderStyle}
    >
      {children}
    </div>
  );
};

const MainHeaderStyle = css({
  padding: '10px',
  display: 'flex',
  fontWeight: 300,
  alignItems: 'center',
  fontSize: '1.5em',
  backgroundColor: '#999999',
  color: '#f0f0f0',
  flexBasis: '80%'
});

const MainHeader: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={MainHeaderStyle}
    >
      {children}
    </div>
  );
};

const HeaderStyle = css({
  display: 'flex'
});

const Header: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={HeaderStyle}
    >
      {children}
    </div>
  );
};

export {SidebarHeader, MainHeader, Header};
