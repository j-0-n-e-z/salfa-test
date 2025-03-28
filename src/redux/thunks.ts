import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Product } from '../types'
import { ProductsState } from './slices/productsSlice'

interface SerializedError {
	message: string
	code?: string
	status?: number
}

const fields: (keyof Product)[] = [
	'id',
	'title',
	'image_id',
	'description',
	'medium_display',
	'thumbnail',
	'date_display',
	'place_of_origin',
	'credit_line',
	'artist_title',
	'category_titles'
]
const BASE_URL = `https://api.artic.edu/api/v1/artworks`
const PRODUCTS_LIMIT = 12
const getProductsUrl = (page: number) =>
	`${BASE_URL}?fields=${fields.join(',')}&page=${page}&limit=${PRODUCTS_LIMIT}`
const getProductUrl = (id: string) =>
	`${BASE_URL}/${id}?fields=${fields.join(',')}`

export const fetchProducts = createAsyncThunk<
	ProductsState['products'],
	number,
	{ rejectValue: SerializedError }
>('products/fetch', async (page, thunkApi) => {
	try {
		const response = await axios.get<ProductsState['products']>(
			getProductsUrl(page)
		)
		return response.data
	} catch (e) {
		const axiosError = e as AxiosError
		return thunkApi.rejectWithValue({
			message: axiosError.message,
			code: axiosError.code,
			status: axiosError.response?.status
		})
	}
})

export const fetchProduct = createAsyncThunk<
	{ data: Product },
	string,
	{ rejectValue: SerializedError }
>('product/fetch', async (id, thunkApi) => {
	try {
		const response = await axios.get<{ data: Product }>(getProductUrl(id))
		return response.data
	} catch (e) {
		const axiosError = e as AxiosError
		return thunkApi.rejectWithValue({
			message: axiosError.message,
			code: axiosError.code,
			status: axiosError.response?.status
		})
	}
})
