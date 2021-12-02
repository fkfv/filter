import React from 'react';

import List from '../list';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setModule, selectModule, listBlockables} from '../../reducers/blocked';
import {selectModules} from '../../reducers/modules';
import {ListItem, ListDescription, ItemName, ItemDescription} from '../list';


const ModuleList = () => {
  const modules = useAppSelector(selectModules);
  const activeModule = useAppSelector(selectModule);
  const dispatch = useAppDispatch();

  return (
    <List>
      {modules.map(module => {
        const isActive = module.name === activeModule;

        return (
          <ListItem
            active={isActive}
            key={module.name}
            onClick={() => {
              dispatch(setModule(module.name));
              dispatch(listBlockables());
            }}
          >
            <ListDescription>
              <ItemName>{module.name}</ItemName>
              <ItemDescription>{module.description}</ItemDescription>
            </ListDescription>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ModuleList;
