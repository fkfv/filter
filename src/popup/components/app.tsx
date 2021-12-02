import React from 'react';

import Body from './layout/main';
import ModuleList from './module/list';
import Blocked from './module/blocked';
import BlockerTabs from './module/tabs';

import {Header, SidebarHeader} from './layout/header';
import {Tabs} from './tabs';


const App = () => {
  return (
    <Tabs>
      <Header>
        <SidebarHeader>
          <span>Filter</span>
        </SidebarHeader>
        <BlockerTabs/>
      </Header>
      <Body>
        <ModuleList/>
        <Blocked/>
      </Body>
    </Tabs>
  );
}

export default App;
