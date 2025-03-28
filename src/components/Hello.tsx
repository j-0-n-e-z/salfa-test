import { Button, Stack, Title } from '@mantine/core'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTitle } from '../contexts/titleContext/TitleContext'

export const Hello: FC = () => {
	const { setTitle } = useTitle()

	useEffect(() => {
		setTitle('ЭКОСИСТЕМА АЛЬФА - ТЕСТОВОЕ ЗАДАНИЕ')
	}, [setTitle])

	return (
		<Stack justify='center' align='center'>
			<Title>Hello there!</Title>
			<Link to='/products'>
				<Button variant='outline' color='pink'>
					Go to products
				</Button>
			</Link>
		</Stack>
	)
}
