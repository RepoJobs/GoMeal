import React from 'react';

import SidebarMenu from 'ui-components/src/components/sidebarMenu';

import logo from '../../assets/images/GoMeal.png'
import dashboardIcon from '../../assets/icons/RestaurantLocation.svg'
import settingsIcon from '../../assets/icons/Setting.svg'
import historyIcon from '../../assets/icons/OrderHistory.svg'
import billIcon from '../../assets/icons/Bill.svg'
import deliveryIcon from '../../assets/icons/Delivery.svg'
import messageIcon from '../../assets/icons/OrderDiscussion.svg'
import favoriteIcon from '../../assets/icons/Review.svg'

const Dashboard = () => {
  return (
    <div>
      <SidebarMenu
        logotype={logo}
        listTabs={[
          {
            text: "Dashboard",
            icon: dashboardIcon
          },
          {
            text: "Food Order",
            icon: deliveryIcon
          },
          {
            text: "Favorite",
            icon: favoriteIcon
          },
          {
            text: "Message",
            icon: messageIcon
          },
          {
            text: "Order History",
            icon: historyIcon
          },
          {
            text: "Bills",
            icon: billIcon
          },
          {
            text: "Settings",
            icon: settingsIcon
          }
        ]}
      />
    </div>
  );
}

export default Dashboard;
