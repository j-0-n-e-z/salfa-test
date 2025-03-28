import { configureStore } from '@reduxjs/toolkit'

import { productReducer } from './slices/productSlice'
import { productsReducer } from './slices/productsSlice'

export const store = configureStore({
	reducer: {
		productsReducer,
		productReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
