import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import useScrollY from '../../hooks/useScrollY'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import styles from './Up.module.css'

const Up = (): JSX.Element => {
	const controls = useAnimation()
	const scrollY = useScrollY()
	useEffect(() => {
		controls.start({ opacity: scrollY / document.body.scrollHeight })
	}, [scrollY, controls])
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={controls}
			className={styles.button}
		>
			<ButtonIcon appearance='primary' icon='up' onClick={scrollToTop} />
		</motion.div>
	)
}

export { Up }
