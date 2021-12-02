import React from 'react';

import {css} from '@emotion/css';


const HeaderStyle = css({
  display: 'flex'
});

const Header = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={HeaderStyle}
    >
      {children}
    </div>
  );
};

const SidebarHeaderStyle = css({
  padding: '10px',
  display: 'flex',
  fontWeight: 300,
  alignItems: 'center',
  fontSize: '2em',
  backgroundColor: '#3d3d3d',
  color: '#ededed',
  flexBasis: '35%'
});

const SidebarHeader = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={SidebarHeaderStyle}
    >
      {children}
    </div>
  );
};

export {Header, SidebarHeader};
