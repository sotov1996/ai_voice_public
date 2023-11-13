import React from "react";
import { Stack, Text, Flex } from "@chakra-ui/react"

export const FormFooter = () => {
    return (
        <Flex
                flexDirection={"row"}
                justifyContent={"center"}
            >
                <Stack>
                    <Text>Empower Your Drive/ </Text>
                </Stack>
                <Stack>
                    <Text>Inspire Your Walks/ </Text>
                </Stack>
                <Stack>
                    <Text>Energize Your Fitness </Text>
                </Stack>
            </Flex>
    )
}