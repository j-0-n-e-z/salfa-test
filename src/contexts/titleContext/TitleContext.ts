import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface TitleContextProps {
	title: string
	setTitle: Dispatch<SetStateAction<string>>
}

export const TitleContext = createContext<TitleContextProps>({
	title: '',
	setTitle: () => {}
})

export const useTitle = () => useContext(TitleContext)
