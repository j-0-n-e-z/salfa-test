import { Button } from '@mantine/core'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Back: FC = () => {
	const navigate = useNavigate()

	function onBackClick() {
		window.scrollTo(0, 0)
		navigate('/products', { replace: true })
	}

	return (
		<Button color='red' onClick={onBackClick}>
			Go back to products
		</Button>
	)
}

export default Back
