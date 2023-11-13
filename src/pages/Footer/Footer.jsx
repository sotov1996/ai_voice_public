import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import "./footer.css"

export const Footer = () => {
    return (
        <Flex
            className={"footer"}
            borderRadius={"1rem 1rem 0 0"}
            width={"100%"}
            height={"100px"}
        >
            <Stack
                borderRadius={"1rem 1rem 0 0"}
                background={"#232323"}
                width={"100%"}
            >
                <h1>Footer</h1>
            </Stack>

        </Flex>
    )
}