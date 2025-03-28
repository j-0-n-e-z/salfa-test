import { z } from 'zod'

export type Form = z.infer<typeof validationScheme>

export const validationScheme = z.object({
	title: z
		.string()
		.min(1, 'Title cannot be empty')
		.min(3, 'Title must be at least 3 characters')
		.max(70, 'Title cannot be longer than 70 characters'),
	description: z.string(),
	display_date: z.string().max(15, 'Display date cannot be longer than 15 characters'),
	origin: z.string(),
	artist: z.string(),
	material: z.string(),
	category: z.string(),
	made: z.string(),
	collection: z.string()
})
