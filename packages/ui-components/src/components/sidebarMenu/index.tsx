import React from 'react';

import { ISidebarMenu } from './types'
import SidebarButton from './sidebarButton';
import SidebarBanner from './sidebarBanner';
import './style.scss';

const SidebarMenu = ({ logotype, listTabs }: ISidebarMenu) => {

   return (
      <>
         <aside className='sidebar'>
            <div className='logotype'>
               <img src={logotype} />
            </div>
            <nav className='sidebarNavlist'>
               {
                  listTabs.map(
                     (item, index) => (
                        <SidebarButton
                           tabName={item.tabName}
                           tabImage={item.tabImage}
                           tabIndex={index}
                           key={index}
                        />
                     )
                  )
               }
            </nav>
            <SidebarBanner bannerText='Upgrade your Account to Get Free Voucher' bannerTextButton='Upgrade' />
         </aside>
      </>
   )
}

export default SidebarMenu;