import { useState } from 'react'
import { TitleContext } from './TitleContext'

export function TitleProvider({ children }: { children: React.ReactNode }) {
	const [title, setTitle] = useState('ЭКОСИСТЕМА АЛЬФА - ТЕСТОВОЕ ЗАДАНИЕ')

	return (
		<TitleContext.Provider value={{ title, setTitle }}>
			{children}
		</TitleContext.Provider>
	)
}
