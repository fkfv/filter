import React from 'react';

import {useState} from 'react';

import ModuleList from './module/list';
import AddDialog from './module/add';
import RemoveDialog from './module/remove';
import Options from './module/options';

import {Main, Container, Body} from './layout/main';
import {SidebarHeader, MainHeader, Header} from './layout/header';
import {useAppSelector} from '../redux/hooks';
import {selectModule} from '../reducers/option';


const App = () => {
  const [visible, setVisible] = useState(false);
  const name = useAppSelector(selectModule) ?? '';

  return (
    <React.Fragment>
      <AddDialog
        visible={visible}
        onClose={() => setVisible(false)}
      />
      <RemoveDialog/>
      <Container>
        <Header>
          <SidebarHeader>
            <span>Filter</span>
          </SidebarHeader>
          <MainHeader>
            <span>{name}</span>
          </MainHeader>
        </Header>
        <Body>
          <ModuleList
            showAddDialog={() => setVisible(true)}
          />
          <Main>
            <Options/>
          </Main>
        </Body>
      </Container>
    </React.Fragment>
  );
};

export default App;
