import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Product } from '../../types'
import { getProductUrl, SerializedError } from './common'

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
