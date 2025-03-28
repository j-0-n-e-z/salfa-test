import { Box, Card, Image, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { deleteProduct, toggleLiked } from '../../redux/slices/productsSlice'
import { Product } from '../../types'
import Delete from '../buttons/Delete'
import Like from '../buttons/Like'

interface ProductCardProps {
	product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { hovered, ref } = useHover()
	const dispatch = useAppDispatch()

	function onLikeClick(e: React.MouseEvent<Element>) {
		e.stopPropagation()
		e.preventDefault()
		dispatch(toggleLiked(product.id))
	}

	function onDeleteClick(e: React.MouseEvent<Element>) {
		e.stopPropagation()
		e.preventDefault()
		dispatch(deleteProduct(product.id))
	}

	return (
		<Link
			to={`/products/${product.id}`}
			onClick={() => window.scrollTo(0, 0)}
			style={{ textDecoration: 'none' }}
		>
			<Card
				ref={ref}
				h='100%'
				shadow='lg'
				radius='md'
				style={{
					transform: hovered ? 'scale(1.03)' : 'scale(1)',
					cursor: 'pointer',
					transition: 'transform 0.3s ease, box-shadow 0.3s ease',
					'&:active': {
						transform: 'scale(0.98)'
					}
				}}
			>
				<Card.Section>
					<Image
						src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`}
						height={200}
						fallbackSrc='src/assets/placeholder.png'
						style={{ objectPosition: 'top' }}
					/>
				</Card.Section>
				<Text mt='md' size='md' style={{ textDecoration: 'none' }} fw='bold'>
					{product.title}
				</Text>
				<Box pos='absolute' right={10} top={10}>
					<Like isLiked={!!product.isLiked} onClick={onLikeClick} />
				</Box>
				<Box pos='absolute' left={10} top={10}>
					<Delete onClick={onDeleteClick} />
				</Box>
			</Card>
		</Link>
	)
}

export default ProductCard
