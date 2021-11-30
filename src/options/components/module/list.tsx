import React from 'react';

import Button from '../controls/button';
import List from '../list';
import RawToggle from '../controls/raw-toggle';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectModules, setConfirmRemove, activateModule,
  deactivateModule} from '../../reducers/modules';
import {selectModule, setModule} from '../../reducers/option';
import {ListItem, ListControls, ListDescription, ItemName,
  ItemDescription, Action} from '../list';


type ModuleListProps = {
  showAddDialog: ((e: React.SyntheticEvent) => void);
}

const ModuleList = ({
  showAddDialog
}: ModuleListProps) => {
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
            onClick={() => dispatch(setModule(module.name))}
            key={module.name}
          >
            <ListDescription>
              <ItemName>{module.name}</ItemName>
              <ItemDescription>{module.description}</ItemDescription>
            </ListDescription>
            <ListControls visible={isActive}>
              <RawToggle
                id={module.name}
                onChange={(e) => {
                  e.target.disabled = true;
                  const enable = () => e.target.disabled = false;

                  if (module.active) {
                    dispatch(deactivateModule(module.name)).unwrap()
                      .then(enable);
                  } else {
                    dispatch(activateModule(module.name)).unwrap()
                      .then(enable);
                  }
                }}
                checked={module.active}
              />
              <Button
                color="red"
                position="sidebar"
                onClick={() => dispatch(setConfirmRemove(module.name))}
              >
                &times;
              </Button>
            </ListControls>
          </ListItem>
        );
      })}
      <Action>
        <Button
          color="green"
          position="action"
          onClick={showAddDialog}
        >+</Button>
        <span>Add Module</span>
      </Action>
    </List>
  );
};

export default ModuleList;
