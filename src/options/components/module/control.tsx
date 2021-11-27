import React from 'react';

import Toggle from '../controls/toggle';
import Input from '../controls/input';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectOption, setOption} from '../../reducers/option';


type ControlProps = {
  name: string;
};

const BooleanControl = ({
  name
}: ControlProps) => {
  const {
    name: displayName,
    value
  } = useAppSelector(state => selectOption(state, name));
  const dispatch = useAppDispatch();

  return (
    <Toggle
      id={name}
      value={value}
      onChange={(e) => dispatch(setOption({name, value: e.target.value}))}
    >
      {displayName}
    </Toggle>
  );
};

const StringControl = ({
  name
}: ControlProps) => {
  const {
    name: displayName,
    value,
    minimumLength,
    maximumLength,
    pattern
  } = useAppSelector(state => selectOption(state, name));
  const dispatch = useAppDispatch();

  return (
    <Input
      label={displayName}
      width="auto"
      minLength={minimumLength}
      maxLength={maximumLength}
      pattern={pattern}
      type="text"
      value={value}
      onChange={(e) => {
        if (e.target.validity.valid) {
          dispatch(setOption({name, value: e.target.value}));
        }
      }}
    />
  );
};

const NumberControl = ({
  name
}: ControlProps) => {
  const {
    name: displayName,
    value,
    minimumValue,
    maximumValue,
    precision
  } = useAppSelector(state => selectOption(state, name));
  const dispatch = useAppDispatch();

  return (
    <Input
      label={displayName}
      width="auto"
      min={minimumValue}
      max={maximumValue}
      step={precision}
      type="number"
      value={value}
      onChange={(e) => {
        if (e.target.validity.valid) {
          dispatch(setOption({name, value: e.target.value}));
        }
      }}
    />
  );
};

const Control = ({
  name
}: ControlProps) => {
  const {type} = useAppSelector(state => selectOption(state, name));

  switch (type) {
  case 'boolean':
    return (<BooleanControl name={name}/>);
  case 'string':
    return (<StringControl name={name}/>);
  case 'number':
    return (<NumberControl name={name}/>);
  default:
    return null;
  }
}

export {BooleanControl, StringControl, NumberControl};
export default Control;
