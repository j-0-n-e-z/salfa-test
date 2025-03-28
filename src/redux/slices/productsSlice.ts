import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pagination, Product } from '../../types'
import { RootState } from '../store'
import { fetchProducts } from '../thunks/fetchProducts'

export interface ProductsState {
	products: {
		pagination: Pagination
		data: Product[]
	} | null
	status: 'idle' | 'pending'
	error: string
}

const initialState: ProductsState = {
	products: null,
	status: 'idle',
	error: ''
}

export const productsSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.status = 'pending'
			state.error = ''
		})
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.status = 'idle'
			state.error = ''
			if (action.payload) {
				state.products = action.payload
			} else {
				state.error = 'No data provided by server'
			}
		})
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.status = 'idle'
			if (action.payload?.status === 404) {
				state.error = 'Products not found'
			} else if (action.payload?.status === 400) {
				state.error = 'Bad request'
			} else {
				state.error = action.payload?.message || 'Failed to load Products'
			}
		})
	},
	initialState,
	name: 'productsSlice',
	reducers: {
		clearProducts: (state) => ({
			...state,
			products: null
		}),
		toggleLiked: (state, action: PayloadAction<number>) => {
			const id = action.payload

			if (state.products) {
				const products = state.products.data.filter((p) => p.id === id)
				if (products.length) {
					products.forEach((product) => (product.isLiked = !product.isLiked))
				}
			}
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			const id = action.payload
			if (state.products) {
				state.products.data = state.products.data.filter(
					(product) => product.id !== id
				)
			}
		},
		createProduct: (state, action: PayloadAction<Product>) => {
			if (state.products) {
				state.products.data.unshift(action.payload)
			}
		}
	}
})

export const selectProducts = createSelector(
	(state: RootState) => state.productsReducer,
	(productsState) => ({
		products: productsState.products,
		status: productsState.status,
		error: productsState.error
	})
)

export const { clearProducts, toggleLiked, deleteProduct, createProduct } =
	productsSlice.actions

export const productsReducer = productsSlice.reducer
