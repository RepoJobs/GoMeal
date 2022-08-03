import React from 'react';

import SidebarMenu from 'ui-components/src/components/sidebarMenu';

import logo from './assets/images/GoMeal.png'
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
