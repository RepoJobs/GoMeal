import React from 'react';

import { IButtonProps } from './types';

import './style.scss';

const SidebarButton = ({tabName, tabImage, ...rest}: IButtonProps) => {

	return(
        <button className='sidebarButton'>
            <img className='buttonIcon' src={tabImage} />
            <p className='buttonText'>{tabName}</p>
        </button>
	)
}

export default SidebarButton;