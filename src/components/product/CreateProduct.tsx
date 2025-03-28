import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, TextInput } from '@mantine/core'
import { useEffect } from 'react'
import { Path, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '../../contexts/titleContext/TitleContext'
import { useAppDispatch } from '../../redux/hooks'
import { createProduct } from '../../redux/slices/productsSlice'
import { Product } from '../../types'
import { Form, validationScheme } from '../../validationScheme'
import Back from '../buttons/Back'

const descriptions: Partial<Record<Path<Form>, string>> = {
	category: 'Specify the categories separated by commas',
	description: 'You can use HTML tags (<p>, <em>, etc.)'
}

const firstCharToUpper = (str: string) => {
	return str[0].toUpperCase() + str.slice(1)
}

export const CreateProduct = () => {
	const dispatch = useAppDispatch()
	const { setTitle } = useTitle()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Form>({ resolver: zodResolver(validationScheme) })

	const onSubmit: SubmitHandler<Form> = (data) => {
		console.log(data)
		const product: Product = {
			...data,
			credit_line: data.collection,
			date_display: data.display_date,
			artist_title: data.artist,
			category_titles: [...data.category.split(',')],
			medium_display: data.material,
			place_of_origin: data.origin,
			isLiked: false,
			thumbnail: {
				alt_text: data.made
			},
			id: Math.round(Math.random() * 9999),
			image_id: 'no-image-id'
		}
		dispatch(createProduct(product))
		navigate('/products')
	}

	useEffect(() => {
		setTitle('PRODUCT CREATION')
	}, [setTitle])

	return (
		<Box component='form' onSubmit={handleSubmit(onSubmit)}>
			<Stack gap='xl'>
				<Stack gap='sm'>
					{(Object.keys(validationScheme.shape) as Path<Form>[]).map(
						(label) => (
							<TextInput
								key={label}
								withAsterisk={label === 'title'}
								error={errors[label]?.message}
								label={firstCharToUpper(label).replace('_', ' ')}
								placeholder={`Enter ${label.replace('_', ' ')}`}
								description={descriptions[label] ?? ''}
								inputWrapperOrder={['label', 'input', 'description', 'error']}
								{...register(label)}
							/>
						)
					)}
				</Stack>
				<Stack gap='lg' align='end'>
					<Button w='fit-content' type='submit'>
						Create product
					</Button>
					<Back />
				</Stack>
			</Stack>
		</Box>
	)
}
