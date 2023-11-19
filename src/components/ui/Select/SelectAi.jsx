import React from "react";
import { LabelAi } from "../Label"
import {
	FormControl,
	FormErrorMessage,
    Select,
    Stack,
    Link
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

export const SelectAi = (props) => {
    const icon = props.icon
    const form = props.form
    const field = props.field
    const labelText = props.labelText
    const name = props.name
    const placeholder = props.placeholder
    const options = props.children
    const link = props.link
    const linkName = props.linkName
    return (
        <FormControl
			isInvalid={form.errors[name] && form.touched[name]}
			mt={4}
		>
			<Stack
			    direction={{ base: 'row', sm: 'row' }}
			    align={'start'}
			    justify={'space-between'}
            >
                <LabelAi labelText={labelText} />
                {link && (
                    <Stack
                        direction={{ base: "row", sm: 'row' }}
                        align={'center'}
                    >
                        <Link
                            color={'rgba(52, 123, 97, 1)'}
                            fontSize={"14px"}
                            fontFamily={"Poppins"}
                            lineHeight={"22px"}
                            fontWeight={400}
                            href={link}
                            isExternal
                        >{linkName}</Link>
                        {icon}
                    </Stack>
                )}
			</Stack>
			<Select
				{...field}
				fontSize={"16px"}
				h={"48px"}
				fontFamily={"Poppins"}
				placeholder={placeholder}
				bg={"rgba(255, 255, 255, 1)"}
				border={"1px solid rgba(171, 168, 164, 1)"}
				focusBorderColor='rgba(171, 168, 164, 1)'
				errorBorderColor="rgba(208, 58, 103, 1)"
				_focusVisible={{
					outline: "none",
			   }}
				_placeholder={{
					color: "rgba(105, 101, 89, 0.6)"
				}}
			>
				{options}
			</Select>
			<FormErrorMessage {...styleFormError}>{form.errors[name]}</FormErrorMessage>
		</FormControl>
    )
}