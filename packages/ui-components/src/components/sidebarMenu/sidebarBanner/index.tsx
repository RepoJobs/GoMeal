import React from 'react';
import { ISidebarBanner } from './types';
import './style.scss';

const SidebarBanner = ({ bannerText, bannerTextButton }: ISidebarBanner ) => {
	return(
		<>
			<div className='sidebarBanner'>
				<h5 className='bannerText'>{bannerText}</h5>
				<button className='bannerButton'>{bannerTextButton}</button>
			</div>
		</>
	)
}

export default SidebarBanner;