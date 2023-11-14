import React from "react";
import { Stack, Text, Flex, Image } from "@chakra-ui/react"
import Drive from "../../assets/02.png"
import Walks from "../../assets/03.png"
import Fitness from "../../assets/06.png"

const styleText = {
    fontFamily: "Poppins",
    fontSize: "12px",
    color: "rgba(105, 101, 89, 1)"
}

export const FormFooter = () => {
    return (
        <Flex
                flexDirection={"row"}
                justifyContent={"space-between"}
                pt={"15px"}
            >
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    mr={"10px"}
                >
                    <Image
                        alt='Empower Your Drive'
                        objectFit='cover'
                        boxSize='250px'
                        borderRadius={"10px"}
                        src={Drive}
                    />
                    <Text {...styleText}>Empower Your Drive</Text>
                </Stack>
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    m={"0 10px 0 10px"}
                >
                    <Image
                        alt='Inspire Your Walks'
                        objectFit='cover'
                        boxSize='250px'
                        borderRadius={"10px"}
                        src={Walks}
                        m={"0 10px 0 10px"}
                    />
                    <Text {...styleText}>Inspire Your Walks </Text>
                </Stack>
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    ml={"10px"}
                >
                    <Image
                        alt='Energize Your Fitness'
                        objectFit='cover'
                        boxSize='250px'
                        borderRadius={"10px"}
                        src={Fitness}
                    />
                    <Text {...styleText}>Energize Your Fitness</Text>
                </Stack>
            </Flex>
    )
}