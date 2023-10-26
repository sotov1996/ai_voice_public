import { Spinner, Center } from "@chakra-ui/react"

export const CustomSpnner = () => (
	<Center position="absolute" bg="rgba(255, 255, 255, 0.5)" w="100%" h="100%" zIndex="10">
		<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="rgba(49, 43, 65, 0.5)" size="xl" />
	</Center>
)
