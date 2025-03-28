import { Box, Container, Flex, Text } from '@mantine/core'
import { useTitle } from '../contexts/titleContext/TitleContext'

export const Header = () => {
	const { title } = useTitle()

	return (
		<Box
			component='header'
			h={70}
			pos='fixed'
			top={0}
			left={0}
			bg='red'
			w='100%'
			style={{ zIndex: 10 }}
		>
			<Container h='100%' w='100vw'>
				<Flex h='100%' justify='center' align='center'>
					<Text c='white' fw='bold' size='xl'>
						{title}
					</Text>
				</Flex>
			</Container>
		</Box>
	)
}
