import { Alert, AlertIcon } from "@chakra-ui/react"

export const CustomAlert = ({ status, message }) => {
	return (
		<Alert status={status} position={"fixed"} zIndex={"1000"} bottom={0}>
			<AlertIcon />
			{message}
		</Alert>
	)
}
