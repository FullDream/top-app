import { AdvantegesProps } from "./Advantages.props";
import styles from './Advantages.module.css';
import cn from 'classnames';
import CheckIcon from './check.svg';


export const Advantages = ({ advantages }: AdvantegesProps): JSX.Element => {
    return (
        <>
        {advantages.map(a => (
            <div key={a._id} className={styles.wrapper}>
                <CheckIcon/>
                <div className={styles.title}>{a.title}</div>
                <hr className={styles.vline}/>
                <div className={styles.vline} >{a.description}</div>
            </div>
        ))}
        </>
    );
};
