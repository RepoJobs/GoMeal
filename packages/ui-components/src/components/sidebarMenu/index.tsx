import React from 'react';
import { ISidebarMenu } from './types'
import SidebarButton from './sidebarButton';
import dashboardIcon from '../../assets/icons/RestaurantLocation.svg'
import './style.scss';
import SidebarBanner from './sidebarBanner';

const SidebarMenu = ({logotype} : ISidebarMenu) => {
	return(
		<>
			<aside className='sidebar'>
				<div className='logotype'>
					<img src={logotype}/>
				</div>
				<nav className='sidebarNavlist'>
					<SidebarButton tabName='Dashboard' tabImage={dashboardIcon} tabIndex={1}/>
					<SidebarButton tabName='Menu' tabImage={dashboardIcon} tabIndex={2}/>
					<SidebarButton tabName='Food Order' tabImage={dashboardIcon} tabIndex={3}/>
					<SidebarButton tabName='Reviews' tabImage={dashboardIcon} tabIndex={4}/>
					<SidebarButton tabName='Settings' tabImage={dashboardIcon} tabIndex={5}/>
				</nav>
				<SidebarBanner bannerText='Upgrade your Account to Get Free Voucher' bannerTextButton='Upgrade'/>
			</aside>
		</>
	)
}

export default SidebarMenu;