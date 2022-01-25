import Image from 'next/image'
import { ProductProps } from './Product.props'
import styles from './Product.module.css'
import cn from 'classnames'
import { Button, Card, Devider, Rating, Tag, Review, ReviewForm } from '..'
import { decOfNum, priceRu } from '../../helpers/helpers'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import {motion} from 'framer-motion'

export const Product = motion(forwardRef(({
	product,
	className,
	...props
}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
	const reviewRef = useRef<HTMLDivElement>(null)

	const variants = {
		visible: {opacity: 1, height: 'auto'},
		hidden: {opacity: 0, height: 0}
	}

	const scrollToReview = () => {
		setIsReviewOpened(true)
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}

	return (
		<div ref={ref} className={className} {...props}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color='green'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.mouth}>мес</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={product.reviewsAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>
					{product.categories.map((c) => (
						<Tag key={c} className={styles.category} color='ghost'>
							{c}
						</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}>
					<a href='#more-review' onClick={scrollToReview}>
						{product.reviewCount}{' '}
						{decOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
					</a>
				</div>
				<Devider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map((item) => (
						<div className={styles.characteristics} key={item.name}>
							<span className={styles.characteristicsName}>{item.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{item.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && (
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					)}

					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					)}
				</div>
				<Devider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						className={styles.reviewButton}
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<motion.div variants={variants} initial='hidden' animate={isReviewOpened ? 'visible' : 'hidden'} >
				<Card color='blue' className={styles.reviews} ref={reviewRef}>
					{product.reviews.map((item) => (
						<div key={item._id}>
							<div>
								<Review review={item} />
							</div>
							<Devider />
						</div>
					))}

					<ReviewForm productId={product._id} />
				</Card>
			</motion.div>
		</div>
	)
}))
