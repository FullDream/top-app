import { Pprops } from "./p.props";
import styles from './P.module.css';

export const P = ({children, size}: Pprops): JSX.Element => {
    switch (size) {
        case 'big':
            return <p className={styles.big}>{children}</p>;
        case 'normal':
            return <p className={styles.normal}>{children}</p>;
        case 'small':
            return <p className={styles.small}>{children}</p>;
        default:
            return <p className={styles.normal}>{children}</p>;
    }
};
