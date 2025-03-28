import { Product } from '../../types'

export interface SerializedError {
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
export const PRODUCTS_LIMIT = 12
export const getProductsUrl = (page: number) =>
	`${BASE_URL}?fields=${fields.join(',')}&page=${page}&limit=${PRODUCTS_LIMIT}`
export const getProductUrl = (id: string) =>
	`${BASE_URL}/${id}?fields=${fields.join(',')}`
