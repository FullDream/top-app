import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import { motion } from 'framer-motion';

import ArrowIcon from './arrow.svg';
export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {
    return (
        <motion.button 
            className={cn(styles.button, {
                [styles.primary]: appearance =='primary',
                [styles.ghost]: appearance =='ghost'
            }, className)}
            {...props}
            >
            
            {children}
            {arrow !=='none' && <span
                className={cn(styles.arrow, {
                    [styles.down]: arrow =='down' 
                })}
            ><ArrowIcon/></span>}
        </motion.button>
    );
    
};