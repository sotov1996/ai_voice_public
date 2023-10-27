import "./App.css"
import React, { useState } from "react"
import { ChakraProvider, Center  } from "@chakra-ui/react"
import { HomePage } from "./pages/Home"
import { CustomSpnner, CustomAlert } from "./components"

export const App = () => {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState("")

	return (
		<ChakraProvider>
			{loading && <CustomSpnner />}
			{alert && <CustomAlert status={alert.status} message={alert.message} />}
			<Center className="main">
				<HomePage setLoading={setLoading} setAlert={setAlert} />
			</Center >
		</ChakraProvider>
	)
}
