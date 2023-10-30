import React, { useEffect, useState } from "react";
import { FormInput } from "../../components";
import { createCheckoutSession } from "../../services/stripe"
import { sendEmail } from "../../services/email"
import { getVoices } from "../../services/elevenLabs"
import { Flex, Stack, Heading } from "@chakra-ui/react"

import "./homePage.css"

export const HomePage = ({ setLoading, setAlert, plausible }) => {
    const [voices, setVoisec] = useState([])

    useEffect(() => {
        getVoicesEleveLabs()
        handlerStripeUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlerStripeUrl = async () => {
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get("session_id")
        if (query.get('success')) {
            const body = JSON.parse(localStorage.getItem('text-to-speech'))
            if (body?.session_id === sessionId) {
                setLoading(true)
                const data = await sendEmail(body);
                setLoading(false)
                if (!data.success) {
                    setAlert({ status: "error", message: data.message })
                    return setTimeout(() => setAlert(""), 3000);
                }
                plausible.trackEvent('Successful Payment')
                setAlert({ status: "success", message: "The payment was successful." })
                setTimeout(() => setAlert(""), 5000);
                localStorage.removeItem('text-to-speech')
            }
            // window.location.replace("/")
        } else if (query.get('canceled')) {
            // window.location.replace("/")
        }
    }

    const getVoicesEleveLabs = async () => {
        const data = await getVoices()
        if (!data.success) {
            setAlert({ status: "error", message: data.message })
            return setTimeout(() => setAlert(""), 3000);
        }
        setVoisec(data.voices)
    }

    const handler = async (values) => {
        const data = await createCheckoutSession(values)
        plausible.trackEvent('Create Order')
        if (data.success) {
            localStorage.setItem('text-to-speech', JSON.stringify({ ...values, session_id: data.session_id }));
            return window.location.replace(data.session_url);
        }
    }
    /*return (
        <Box bg='#F6F5F2' w='644px' minH='687px' p={"32px 64px"} className="main-box">
            <h1 className="main-title">Affirmation <span>Synthesis</span></h1>
            <FormInput handler={handler} voices={voices} />
        </Box>
    )*/
    return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          className="wrapper"
          >
          <Stack
            spacing={4}
            borderRadius={"16px"}
            w={'full'}
            maxW={'644px'}
            bg={'rgba(246, 245, 242, 1)'}
            boxShadow={'0px 16px 24px 0px rgba(64, 52, 16, 0.08)'}
            p={"32px 64px 32px 64px"}>
            <Heading
                fontFamily={"Playfair Display"}
                fontSize={"32px"}
                fontWeight={500}
                lineHeight={"38px"}
                color={"rgba(52, 123, 98, 1)"}
                textAlign={"center"}
                fontStyle={"italic"}
            >
                Affirmation
                {" "}
                <span
                    style={{
                        color: "rgba(35, 35, 35, 1)",
                        fontWeight: 400,
                        fontStyle: "normal"
                    }}
                >Synthesis</span>
            </Heading>
            <FormInput handler={handler} voices={voices} />
          </Stack>
        </Flex>
      )

}