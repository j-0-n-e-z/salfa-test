import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { ProductsState } from "../slices/productsSlice"
import { getProductsUrl, SerializedError } from "./common"

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
