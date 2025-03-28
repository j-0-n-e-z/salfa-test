import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Product } from '../../types'
import { type RootState } from '../store'
import { fetchProduct } from '../thunks/fetchProduct'

export interface ProductState {
	product: Product | null
	status: 'idle' | 'pending'
	error: string
}

const initialState: ProductState = {
	product: null,
	status: 'idle',
	error: ''
}

export const productSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.status = 'idle'
			state.product = action.payload.data
			state.error = ''
		})
		builder.addCase(fetchProduct.pending, (state) => {
			state.status = 'pending'
			state.error = ''
		})
		builder.addCase(fetchProduct.rejected, (state, action) => {
			state.status = 'idle'
			state.product = null
			// console.log(action.payload)
			if (action.payload?.status === 404) {
				state.error = 'Product not found'
			} else if (action.payload?.status === 400) {
				state.error = 'Bad request'
			} else {
				state.error = action.payload?.message || 'Failed to load Product'
			}
		})
	},
	initialState,
	name: 'productSlice',
	reducers: {
		clearProduct: (state) => ({
			...state,
			product: null
		}),
		setProduct: (state, action: PayloadAction<Product>) => {
			state.product = action.payload
		}
	}
})

export const selectProduct = createSelector(
	(state: RootState) => state.productReducer,
	(productState) => ({
		product: productState.product,
		status: productState.status,
		error: productState.error
	})
)
export const { clearProduct, setProduct } = productSlice.actions

export const productReducer = productSlice.reducer
