import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { ReviewFormProps } from "./ReviewForm.props";
import { Button, Input, Rating, Textarea } from '..';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';

import styles from './ReviewForm.module.css';

import CloseIcon from './close.svg';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();

    const [isSuccess, setIsSucess] = useState<boolean>(false);
    const [errorSend, setErrorSend] = useState<string>('');

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSendResponse>(API.review.createDemoм, { ...formData, productId });

            if (data.message) {
                setIsSucess(true);
                reset();
            } else {
                setErrorSend('Что-то пошло не так...');
            }

        } catch (error) {
            setErrorSend(error.message);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    error={errors.name}
                    placeholder='Имя'
                />

                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    error={errors.title}
                    placeholder='Заголовок отзыва'
                    className={styles.title}
                />

                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        name='rating'
                        render={({ field }) => (
                            <Rating error={errors.rating} isEditable rating={field.value} ref={field.ref} setRating={field.onChange} />
                        )}
                    />
                </div>
                <Textarea
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })}
                    error={errors.description}
                    placeholder='Текст отзыва'
                    className={styles.description}
                />
                <div className={styles.submit}>
                    <Button appearance='primary' >Отправить</Button>
                    <span className={styles.info} >* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>

            {isSuccess &&
                <div className={cn(styles.panel, styles.success)}>
                    <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                    <div>
                        Спасибо, ваш отзыв будет опубликован после проверки.
                    </div>
                    <CloseIcon className={styles.close} onClick={() => setIsSucess(false)} />
                </div>

            }

            {errorSend &&
                <div className={cn(styles.panel, styles.error)}>
                    Что-то пошло не так, повторите попытку позже)
                    <CloseIcon className={styles.close} onClick={() => setErrorSend('')} />
                </div>
            }

        </form>
    );
};
