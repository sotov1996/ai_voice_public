import { Alert, AlertIcon } from "@chakra-ui/react"

export const CustomAlert = ({ status, message }) => {
	return (
		<Alert status={status}>
			<AlertIcon />
			{message}
		</Alert>
	)
}
