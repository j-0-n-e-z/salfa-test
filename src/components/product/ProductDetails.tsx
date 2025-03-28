import { Box, Card, Image, Skeleton, Stack, Text, Title } from '@mantine/core'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../contexts/titleContext/TitleContext'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
	clearProduct,
	selectProduct,
	setProduct
} from '../../redux/slices/productSlice'
import { selectProducts } from '../../redux/slices/productsSlice'
import { fetchProduct } from '../../redux/thunks'
import Back from '../buttons/Back'
import { ErrorPage } from '../ErrorPage'

const ProductDetails: FC = () => {
	const dispatch = useAppDispatch()
	const { product, status, error } = useAppSelector(selectProduct)
	const { products } = useAppSelector(selectProducts)
	const { id } = useParams<{ id: string }>()
	const { setTitle } = useTitle()

	useEffect(() => {
		if (id) {
			const productFromStore = products?.data.find(
				(p) => p.id.toString() === id
			)
			if (productFromStore) {
				dispatch(setProduct(productFromStore))
			} else {
				dispatch(fetchProduct(id))
			}
		}

		return () => {
			dispatch(clearProduct())
		}
	}, [])

	useEffect(() => {
		if (product) {
			setTitle(product.title)
		}
	}, [product, setTitle])

	if (status === 'pending') {
		return <Skeleton height={900} radius='md' />
	}
	if (error) {
		return <ErrorPage message={error} />
	}
	if (!product) {
		return <ErrorPage message='Product was not loaded' />
	}

	return (
		<Stack align='center'>
			<Card w='100%' withBorder radius='lg' shadow='md' padding='lg'>
				<Card.Section>
					<Image
						src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`}
						alt='no image'
						fallbackSrc='/src/assets/placeholder.png'
					/>
				</Card.Section>
				<Stack gap='sm' mt='md'>
					<Title>{product.title}</Title>
					<Text
						dangerouslySetInnerHTML={{
							__html:
								product.description?.replace(/<\/?p>/g, '') ??
								'<em>Description is missing</em>'
						}}
					/>
					<Text>
						<b>Date:</b> {product.date_display || 'unknown'}
					</Text>
					<Text>
						<b>Origin:</b> {product.place_of_origin || 'unknown'}
					</Text>
					<Text>
						<b>Artist:</b> {product.artist_title || 'unknown'}
					</Text>
					{
						<Text>
							<b>Material:</b> {product.medium_display || 'unknown'}
						</Text>
					}
					<Text>
						<b>Category:</b> {product.category_titles.join(', ') || 'unknown'}
					</Text>
					<Text>
						<b>Made:</b> {product.thumbnail?.alt_text || 'unknown'}
					</Text>
					<Text>
						<b>Collection:</b> {product.credit_line || 'unknown'}
					</Text>
				</Stack>
			</Card>
			<Box mt='lg'>
				<Back />
			</Box>
		</Stack>
	)
}

export default ProductDetails
