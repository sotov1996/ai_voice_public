import React from "react";
import { LabelAi } from "../Label"
import {
	FormControl,
	FormErrorMessage,
	Input,
	InputRightElement,
	InputGroup
} from "@chakra-ui/react"

const styleFormError = {
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "rgba(208, 58, 103, 1)",
    fontWeight: 400,
    lineHeight: "21px",
    letterSpacing: "0em",
    textAlign: "left"
}

const styleFormInput = {
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left",
    p: "12px",
	pr: "40px",
	h: "48px",
	bg: "rgba(255, 255, 255, 1)",
	borderWidth: "1px",
	borderColor: "rgba(171, 168, 164, 1)",
	focusBorderColor: 'rgba(171, 168, 164, 1)',
	errorBorderColor: "rgba(208, 58, 103, 1)",
    _focusVisible: { outline: "none" },
    _placeholder: { color: "rgba(105, 101, 89, 0.6)" }
}

export const InputAi = (props) => {
    const icon = props.icon
    const form = props.form
    const field = props.field
    const labelText = props.labelText
    const name = props.name
    const placeholder = props.placeholder
    return (
		<FormControl isInvalid={form.errors[name] && form.touched[name]} mt={4}>
            <LabelAi labelText={labelText} />
			<InputGroup>
				<Input
					{...field}
					placeholder={placeholder}
					{...styleFormInput}
				/>
				<InputRightElement h={"100%"}>
					{icon}
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage {...styleFormError}>{form.errors[name]}</FormErrorMessage>
		</FormControl>
    )
}