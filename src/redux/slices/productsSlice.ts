import {
	createSelector,
	createSlice,
	current,
	PayloadAction
} from '@reduxjs/toolkit'
import { Pagination, Product } from '../../types'
import { RootState } from '../store'
import { fetchProducts } from '../thunks'

export interface ProductsState {
	products: {
		pagination: Pagination
		data: Product[]
	} | null
	likedProductIds: number[]
	createdProducts: Product[]
	status: 'idle' | 'pending'
	error: string
}

const initialState: ProductsState = {
	products: null,
	likedProductIds: [],
	createdProducts: [],
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
				state.products = {
					pagination: action.payload.pagination,
					data: setProductsLiked(action.payload.data, state.likedProductIds)
				}
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
			console.log('before toggle', current(state))

			const id = action.payload
			console.log(id)

			if (state.likedProductIds.includes(id)) {
				state.likedProductIds = state.likedProductIds.filter(
					(pid) => pid !== id
				)
			} else {
				state.likedProductIds.push(id)
			}

			const product = state.createdProducts
				.concat(state.products?.data ?? [])
				.find((p) => p.id === id)
			if (product) {
				product.isLiked = !product.isLiked
			}

			console.log('after toggle', current(state))
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			const id = action.payload
			if (state.products) {
				state.products.data = deleteProductById(state.products.data, id)
				state.likedProductIds = state.likedProductIds.filter(
					(pid) => pid !== id
				)
			}
		},
		createProduct: (state, action: PayloadAction<Product>) => {
			state.createdProducts.push(action.payload)
		}
	}
})

const deleteProductById = (products: Product[], id: number) => {
	return products.filter((product) => product.id !== id)
}

const setProductsLiked = (products: Product[], likedProductIds: number[]) => {
	return products.map((product) => ({
		...product,
		isLiked: product.isLiked || likedProductIds.includes(product.id)
	}))
}

export const selectProducts = createSelector(
	(state: RootState) => state.productsReducer,
	(productsState) => {
		if (productsState.products?.pagination.current_page === 1) {
			return {
				products: {
					pagination: productsState.products.pagination,
					data: productsState.createdProducts.concat(
						productsState.products.data
					)
				},
				status: productsState.status,
				error: productsState.error
			}
		}
		return {
			products: productsState.products,
			status: productsState.status,
			error: productsState.error
		}
	}
)

export const getLikedProductIds = (state: RootState) =>
	state.productsReducer.likedProductIds

export const { clearProducts, toggleLiked, deleteProduct, createProduct } =
	productsSlice.actions

export const productsReducer = productsSlice.reducer
