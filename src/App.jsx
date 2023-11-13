import "./App.css"
import React, { useState } from "react"
import { ChakraProvider, Flex  } from "@chakra-ui/react"
import Plausible from "plausible-tracker"
import { HomePage } from "./pages"
import { CustomSpnner, CustomAlert } from "./components"

const plausible = Plausible({
	domain: "app.myaffirmation.ai",
	trackLocalhost: true
  })

export const App = () => {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState("")

	return (
		<ChakraProvider>
			{loading && <CustomSpnner />}
			{alert && <CustomAlert status={alert.status} message={alert.message} />}
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				className="wrapper"
				p={"20px"}
			>
				<HomePage setLoading={setLoading} setAlert={setAlert} plausible={plausible} />
			</Flex>
		</ChakraProvider>
	)
}
