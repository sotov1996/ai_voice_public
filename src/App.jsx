import "./App.css"
import React, { useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { HomePage } from "./pages/Home"
import { Footer, Header, CustomSpnner, CustomAlert } from "./components"

export const App = () => {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState("")

	return (
		<ChakraProvider>
			{loading && <CustomSpnner />}
			{alert && <CustomAlert status={alert.status} message={alert.message} />}
			<Grid
				templateAreas={`"header""main""footer"`}
				gridTemplateRows={"60px 1fr 60px"}
				gridTemplateColumns={"1fr"}
        		p="2"
				color="blackAlpha.700"
				fontWeight="bold"
        		bg="#e0e3e4"
			>
				<GridItem bg="white" borderBottom="2px" borderColor="#e0e3e4" area={"header"}>
					<Header />
				</GridItem>
				<GridItem p="2" area={"main"} bg="white">
					<HomePage setLoading={setLoading} setAlert={setAlert} />
				</GridItem>
				<GridItem pl="2" area={"footer"} bg="white" borderTop="2px" borderColor="#e0e3e4">
					<Footer />
				</GridItem>
			</Grid>
		</ChakraProvider>
	)
}
