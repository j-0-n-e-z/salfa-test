import {
	Button,
	Flex,
	Grid,
	Pagination,
	Skeleton,
	Stack,
	Switch,
	Title
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '../../contexts/titleContext/TitleContext'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectProducts } from '../../redux/slices/productsSlice'
import { fetchProducts } from '../../redux/thunks/fetchProducts'
import { ErrorPage } from '../ErrorPage'
import ProductCard from './ProductCard'

const ProductsList = () => {
	const dispatch = useAppDispatch()
	const { setTitle } = useTitle()
	const [isShowLikedProducts, setIsShowLikedProducts] = useState(false)
	const [activePage, setPage] = useState(1)
	const { products, status, error } = useAppSelector(selectProducts)
	const navigate = useNavigate()

	useEffect(() => {
		setTitle('PRODUCTS')
	}, [setTitle])

	useEffect(() => {
		dispatch(fetchProducts(activePage))
	}, [activePage, dispatch])

	if (error) return <ErrorPage message={error} />

	const displayProducts = isShowLikedProducts
		? products?.data.filter((product) => product.isLiked)
		: products?.data

	return (
		<Stack gap='xl'>
			<Flex justify='space-between' align='center'>
				<Switch
					styles={{ label: { userSelect: 'none' } }}
					w='fit-content'
					color='red'
					label='Show only liked products'
					onChange={(e) => setIsShowLikedProducts(e.target.checked)}
				/>
				<Button onClick={() => navigate('/create-product')}>
					Create product
				</Button>
				<Pagination
					value={activePage}
					onChange={setPage}
					total={products?.pagination?.total_pages ?? 10}
				/>
			</Flex>
			{status === 'pending' && (
				<Grid>
					{[...Array(12)].map((_, i) => (
						<Grid.Col key={i} span={4}>
							<Skeleton height={200} radius='md' />
						</Grid.Col>
					))}
				</Grid>
			)}
			{(!displayProducts || displayProducts.length === 0) && (
				<Flex justify='center'>
					<Title>No {isShowLikedProducts ? 'liked' : ''} products</Title>
				</Flex>
			)}
			{displayProducts && (
				<Grid gutter={{ base: 'md', sm: 'lg' }}>
					{displayProducts.map((product) => (
						<Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
							<ProductCard product={product} />
						</Grid.Col>
					))}
				</Grid>
			)}
		</Stack>
	)
}

export default ProductsList
