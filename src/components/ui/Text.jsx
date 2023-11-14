import React from "react";
import {
	Text
} from "@chakra-ui/react"

const styleFormText = {
    fontFamily: "Poppins",
    fontSize: "16px",
    color: "rgba(105, 101, 89, 1)",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left"
}

export const TextAi = (props) => {
    return (
        <Text {...styleFormText} {...props.style} >{props.text}</Text>
    )
}