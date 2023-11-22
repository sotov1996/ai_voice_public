import "./App.css"
import React, { useState } from "react"
import { ChakraProvider, Flex  } from "@chakra-ui/react"
import Plausible from "plausible-tracker"
import { HomePage } from "./pages"
import { CustomSpnner, CustomAlert } from "./components"
import { Context } from "./context"
import { Routes, Route  } from 'react-router-dom'

const plausible = Plausible({
	domain: "app.myaffirmation.ai",
	trackLocalhost: true
  })

export const App = () => {
	const [loading, setLoading] = useState({})
	const [alert, setAlert] = useState("")

	const handlerAlert = (data) => {
		setAlert(data)
		setTimeout(() => setAlert(""), 5000);
	}

	const handlerLoading = (data) => {
		setLoading((prev) => ({ ...prev, ...data }))
	}

	return (
		<Context.Provider value={{
			loading, alert, plausible, handlerAlert, handlerLoading
		}}>
			<ChakraProvider>
				{(loading.email || loading.voices || loading.gpt) && <CustomSpnner />}
				{alert && <CustomAlert status={alert.status} message={alert.message} />}
				<Flex
					minH={'100vh'}
					align={'center'}
					justify={'center'}
					className="wrapper"
					p={"20px"}
				>
					<Routes>
						<Route exact path="/" element={<HomePage />} />
					</Routes>
				</Flex>
			</ChakraProvider>
		</Context.Provider>
	)
}
