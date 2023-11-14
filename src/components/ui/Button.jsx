import React from "react";
import {
	Button
} from "@chakra-ui/react"

const styleFormText = {
    variant: 'solid',
	fontWeight: 400,
	fontFamily: "Poppins",
	fontSize: "16px",
	lineHeight: "24px",
	borderRadius: "8px",
	h: "auto",
	whiteSpace: "normal",
	border: "1px solid rgba(0, 0, 0, 0.15)",
	color: "rgba(105, 101, 89, 1)",
	bg: "none",
	p: "12px 24px 12px 24px"
}

export const ButtonAi = (props) => {
    return (
        <Button
            {...styleFormText}
            {...props.style}
            {...props.other}
            onClick={props.handler}
        >
            {props.text}
        </Button>
    )
}