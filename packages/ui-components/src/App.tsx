import React from 'react';

import SidebarMenu from './components/sidebarMenu';

import logo from './assets/images/GoMealLogo.svg'

function App() {
  return (
    <div className="App">
      <SidebarMenu logotype={logo}/>
    </div>
  );
}

export default App;
