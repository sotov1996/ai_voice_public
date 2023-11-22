import React from "react"
import {
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@chakra-ui/react"
import { ButtonAi } from "../../components"
import { FormGpt } from "./gpt"

export const ModalOpenai = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<ButtonAi
				text={"Start"}
				other={{
					type: "button",
				}}
				style={{
					mt: "12px",
				}}
				handler={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					borderRadius={"16px"}
					bg={"rgba(246, 245, 242, 1)"}
					boxShadow={"0px 16px 24px 0px rgba(64, 52, 16, 0.08)"}
					p={"24px 24px"}
					m={"auto 20px"}
				>
					<ModalHeader
						fontFamily={"Playfair Display"}
						fontSize={"26px"}
						fontWeight={500}
						lineHeight={"32px"}
						color={"rgba(52, 123, 98, 1)"}
						pt={"32px"}
						textAlign={"center"}
						fontStyle={"italic"}
					>
						Create Affirmation Using GPT
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormGpt closeModal={onClose} setText={props.setText} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
