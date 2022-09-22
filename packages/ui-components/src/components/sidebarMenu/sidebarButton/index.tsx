import React from 'react';

import { ISidebarButtonProps } from './types';

import './style.scss';

const SidebarButton = ({text, icon, ...rest}: ISidebarButtonProps) => {

	return(
        <button className='sidebarButton'>
            <img className='buttonIcon' src={icon} alt=""/>
            <p className='buttonText'>{text}</p>
        </button>
	)
}

export default SidebarButton;