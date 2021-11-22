import cn from 'classnames';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { firstLevelMenu } from '../../helpers/helpers';

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';

import styles from './Menu.module.css';




export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const openSecondMenu = (secondCategory: string) => {
        setMenu && setMenu(menu.map(item => {
            if (item._id.secondCategory == secondCategory) {
                item.isOpened = !item.isOpened;
            }
            return item;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(menuMain => (
                    <div key={menuMain.route}>
                        <Link href={`/${menuMain.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: menuMain.id == firstCategory
                                })}>
                                    {menuMain.icon}
                                    <span>{menuMain.name}</span>
                                </div>
                            </a>
                        </Link>
                        {menuMain.id == firstCategory && buildSecondLevel(menuMain)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {
                    menu.map(item => {
                        if(item.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                            item.isOpened = true;
                        }
                        return (
                            <div key={item._id.secondCategory}>
                                <div className={styles.secondLevel} onClick={() => openSecondMenu(item._id.secondCategory)}>{item._id.secondCategory}</div>
                                <div className={cn(styles.secondLevelBlock, {
                                    [styles.secondLevelBlockOpened]: item.isOpened
                                })}
                                >
                                    {buildThirdLevel(item.pages, menuItem.route)}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );

    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link href={`/${route}/${p.alias}`}>
                    <a 
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                        })}
                    >
                        {p.category}
                    </a>
                </Link>
            ))

        );
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );

};
