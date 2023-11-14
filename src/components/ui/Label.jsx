import React from "react";
import {
	FormLabel
} from "@chakra-ui/react"

const styleFormLabel = {
    fontFamily: "Poppins",
    fontSize: "16px",
    color: "rgba(105, 101, 89, 1)",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left"
}

export const LabelAi = (props) => {
    return (
        <FormLabel {...styleFormLabel}>{props.labelText}</FormLabel>
    )
}