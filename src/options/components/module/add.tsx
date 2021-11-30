import React from 'react';

import {useState} from 'react';

import Button from '../controls/button';
import Select from '../controls/select';
import Input from '../controls/input';

import {Dialog, DialogHeader, DialogBody, DialogFooter} from '../dialog';
import {TabPanel, TabList, Tabs, Tab, PanelList} from '../tabs';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {selectErrorMessage, addModule} from '../../reducers/modules';


type AddDialogProps = {
  visible: boolean;
  onClose: ((e: React.SyntheticEvent) => void);
};

const PresetModules = {
  'Test Module': chrome.runtime.getURL('modules/test/module.json')
};

const AddDialog = ({
  visible,
  onClose
}: AddDialogProps) => {
  /*
  ** Force the module url to be the default preset module.
  */
  const [moduleUrl, setModuleUrl] = useState(Object.values(PresetModules)[0] as string);
  const errorMessage = useAppSelector(selectErrorMessage);
  const hasError = typeof errorMessage !== 'undefined';
  const dispatch = useAppDispatch();

  return (
    <Dialog visible={visible}>
      <DialogHeader>
        <DialogHeader.Title>Add</DialogHeader.Title>
        <DialogHeader.CloseButton onClick={onClose}/>
      </DialogHeader>
      <DialogBody>
        <Tabs>
          <TabList>
            <Tab>Preset</Tab>
            <Tab>Custom</Tab>
          </TabList>
          <PanelList>
            <TabPanel>
              <Select
                label="Module"
                onChange={(e) => setModuleUrl(e.target.value)}
                value={moduleUrl}
              >
                {Object.entries(PresetModules).map(([name, url]) => {
                  return (
                    <option
                      value={url}
                      key={url}
                    >{name}</option>
                  );
                })}
              </Select>
            </TabPanel>
            <TabPanel>
              <Input
                label="URL"
                type="url"
                width="full"
                onChange={(e) => setModuleUrl(e.target.value)}
              />
            </TabPanel>
          </PanelList>
        </Tabs>
      </DialogBody>
      <DialogFooter>
        <DialogFooter.Status
          visible={hasError}
          type="error"
        >
          {errorMessage ?? ''}
        </DialogFooter.Status>
        <DialogFooter.ButtonGroup>
          <Button
            color="green"
            onClick={(e) => {
              dispatch(addModule(moduleUrl)).unwrap()
                .then(() => onClose(e))
                .catch(() => undefined);
            }}
          >
            Add
          </Button> 
          <Button
            color="red"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogFooter.ButtonGroup>
      </DialogFooter>
    </Dialog>
  );
};

export default AddDialog;
