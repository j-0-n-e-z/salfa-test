export interface Pagination {
	current_page: number
	limit: number
	next_url: string
	offset: number
	total: number
	total_pages: number
}

export interface Thumbnail {
	alt_text: string
}

export interface Product {
	isLiked: boolean
	id: number
	title: string
	thumbnail: Thumbnail | null
	date_display: string | null
	place_of_origin: string | null
	medium_display: string | null
	description: string | null
	credit_line: string | null
	artist_title: string | null
	category_titles: string[]
	image_id: string
}
