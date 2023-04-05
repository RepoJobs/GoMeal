import React from 'react';
import { AdvertisementCardProps } from './types';
import './style.scss';

const AdvertisementCard = ({ bannerText, bannerTextButton }: AdvertisementCardProps ) => {
	return(
		<>
			<div className='sidebarBanner'>
				<h5 className='bannerText'>{bannerText}</h5>
				<button className='bannerButton'>{bannerTextButton}</button>
			</div>
		</>
	)
}

export default AdvertisementCard;