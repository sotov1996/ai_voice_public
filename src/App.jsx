import "./App.css"
import React, { useState } from "react"
import { ChakraProvider  } from "@chakra-ui/react"
import Plausible from "plausible-tracker"
import { HomePage } from "./pages/Home"
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
			<HomePage setLoading={setLoading} setAlert={setAlert} plausible={plausible} />
		</ChakraProvider>
	)
}
