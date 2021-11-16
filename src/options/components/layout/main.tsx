import React from 'react';

import {css} from '@emotion/css';


const MainStyle = css({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '80%'
});

const Main: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={MainStyle}
    >
      {children}
    </div>
  );
};

const ContainerStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Container: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={ContainerStyle}
    >
      {children}
    </div>
  );
};

const BodyStyle = css({
  height: '100%',
  display: 'flex'
});

const Body: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={BodyStyle}
    >
      {children}
    </div>
  );
};

export {Main, Container, Body};
