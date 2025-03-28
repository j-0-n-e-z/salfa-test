import { Box, Container } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

function App() {
	return (
		<>
			<Header />
			<Box component='main'>
				<Container pt={100} pb={50}>
					<Outlet />
				</Container>
			</Box>
		</>
	)
}

export default App
