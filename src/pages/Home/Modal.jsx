import React from "react"
import {
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	Button,
	ModalHeader,
	ModalBody,
	ModalFooter,
    useDisclosure
} from "@chakra-ui/react"
import { generateText } from "../../services/openai"

export const ModalOpenai = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={() => generateText({text: "Secondary Action"})}>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }