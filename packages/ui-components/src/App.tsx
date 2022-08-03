import React from 'react';

import SidebarMenu from './components/sidebarMenu';

import logo from './assets/images/GoMealLogo.svg'
import iconMenu from './assets/icons/RestaurantLocation.svg'

function App() {
  return (
    <div className="App">
      <SidebarMenu 
        logotype={logo}
        listTabs={[
          {
            tabName: "Dashboard",
            tabImage: iconMenu
          },
          {
            tabName: "Offers",
            tabImage: iconMenu
          }
        ]}
      />
    </div>
  );
}

export default App;
