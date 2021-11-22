import { Pprops } from "./P.props";
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({children, size = 'normal', ...props}: Pprops): JSX.Element => {
    return (
        <p 
            className={cn(styles.p, {
                [styles.big]: size =='big',
                [styles.normal]: size =='normal',
                [styles.small]: size =='small',
            })}
            {...props}
        >
            {children}
        </p>
    );
};
