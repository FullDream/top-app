import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";

import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ error, isEditable = false, rating, setRating, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        ConstructRating(rating);
    }, [rating]);

    const ConstructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                >
                    <StarIcon

                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
                    >

                    </StarIcon>
                </span>
            );
        });
        setRatingArray(updateArray);
    };

    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        ConstructRating(i);
    };

    const onClick = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
        if (e.code != 'Space' || !setRating) {
            return;
        }
        setRating(i);
    };

    return (
        
            <div {...props} ref={ref} className={cn(styles.wrapper, {
                [styles.error]: error
            })}>
                {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
                {error && <span className={styles.errorMessage}>{error.message}</span>}
            </div>
           
       
    );
});
