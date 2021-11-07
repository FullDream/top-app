import styles from './Menu.module.css';
import cn from 'classnames';
import {format} from 'date-fns';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    return (
        
    );
};
