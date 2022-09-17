import React from 'react';

import { ISidebarMenu } from './types'
import SidebarButton from './sidebarButton';
import AdvertisementCard from './AdvertisementCard ';
import './style.scss';

const SidebarMenu = ({ logotype, listTabs }: ISidebarMenu) => {

   return (
      <>
         <aside className='sidebar'>
            <div className='logotype'>
               <img src={logotype} />
            </div>
            <nav className='sidebarNavlist'>
               {listTabs.map(
                     (item, index) => (
                        <SidebarButton
                           text={item.text}
                           icon={item.icon}
                           tabIndex={index}
                           key={index}
                        />
                     )
                  )
               }
            </nav>
            <AdvertisementCard bannerText='Upgrade your Account to Get Free Voucher' bannerTextButton='Upgrade' />
         </aside>
      </>
   )
}

export default SidebarMenu;