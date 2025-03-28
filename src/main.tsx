import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { ErrorPage } from './components/ErrorPage.tsx'
import { Hello } from './components/Hello.tsx'
import { CreateProduct } from './components/product/CreateProduct.tsx'
import ProductDetails from './components/product/ProductDetails.tsx'
import ProductsList from './components/product/ProductsList.tsx'
import { TitleProvider } from './contexts/titleContext/TitleProvider.tsx'
import { store } from './redux/store.ts'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage message='Error occurred' />,
		children: [
			{ index: true, element: <Hello /> },
			{ path: 'products', element: <ProductsList /> },
			{ path: 'products/:id', element: <ProductDetails /> },
			{ path: 'create-product', element: <CreateProduct /> },
			{
				path: '*',
				element: <ErrorPage message='Path not found' />
			}
		]
	}
])

const theme = createTheme({
	cursorType: 'pointer'
})

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<MantineProvider theme={theme}>
			<TitleProvider>
				<RouterProvider router={router} />
			</TitleProvider>
		</MantineProvider>
	</Provider>
)
