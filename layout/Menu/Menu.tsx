import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { motion } from 'framer-motion';
import cn from 'classnames';


import { AppContext } from '../../context/app.context';

import { firstLevelMenu } from '../../helpers/helpers';

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';

import styles from './Menu.module.css';




export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
            }
        },
        hidden: {
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'fit-content'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    };

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
                        if (item.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                            item.isOpened = true;
                        }
                        return (
                            <div key={item._id.secondCategory}>
                                <div className={styles.secondLevel} onClick={() => openSecondMenu(item._id.secondCategory)}>{item._id.secondCategory}</div>
                                <motion.div
                                    layout
                                    variants={variants}
                                    className={styles.secondLevelBlock}
                                    initial={item.isOpened ? 'visible' : 'hidden'}
                                    animate={item.isOpened ? 'visible' : 'hidden'}
                                >
                                    {buildThirdLevel(item.pages, menuItem.route)}
                                </motion.div>
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
                <motion.div
                    key={p._id}
                    variants={variantsChildren}
                >
                    <Link href={`/${route}/${p.alias}`} key={p._id}>
                        <a
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                            })}
                        >
                            {p.category}
                        </a>
                    </Link>
                </motion.div>
            ))

        );
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );

};
