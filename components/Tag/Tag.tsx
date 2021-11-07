import { Pprops } from "./Tag.props";
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({children, size = 'normal', color = 'ghost', href, className,  ...props}: Pprops): JSX.Element => {
    return (
        <div 
            className={cn(styles.tag, className, {
                [styles.big]: size =='big',
                [styles.normal]: size =='normal',
                [styles.ghost]: color =='ghost',
                [styles.red]: color =='red',
                [styles.grey]: color =='grey',
                [styles.green]: color =='green',
                [styles.primary]: color =='primary',
            })}
            {...props}
        >
            {href ? <a href={href}>{children}</a> : <>{children}</>}
        </div>
    );
};
