import { Flex, Stack, Title } from '@mantine/core'
import { FC } from 'react'
import Back from './buttons/Back'

interface ErrorProps {
	message: string
	isShowBackButton?: boolean
}

export const ErrorPage: FC<ErrorProps> = ({
	message,
	isShowBackButton = true
}) => {
	return (
		<Stack align='center' gap='lg'>
			<Flex justify='center'>
				<Title>{message}</Title>
			</Flex>
			{isShowBackButton && <Back />}
		</Stack>
	)
}
