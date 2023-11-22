import React, { useEffect, useState, useContext } from "react";
import { FormInput } from "./Form";
import { createCheckoutSession } from "../../services/stripe"
import { sendEmail } from "../../services/email"
import { getVoices, getTextIntoSpeech } from "../../services/elevenLabs"
import { FormFooter } from "./FormFooter"
import { Context } from "../../context";
import { Stack, Heading, useMediaQuery } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

import "./homePage.css"

export const HomePage = () => {
    const  { handlerAlert, handlerLoading, plausible } = useContext(Context)

    const navigate = useNavigate()

    const [voices, setVoisec] = useState([])
    const [audioUrl, setAudioUrl] = useState(null)

    const [isLargerThan500] = useMediaQuery('(max-width: 500px)')

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
            localStorage.removeItem('text-to-speech')
            navigate({ pathname: "/", search: "" })
            if (body?.session_id === sessionId) {
                handlerLoading({ email: true })
                const data = await sendEmail(body);
                handlerLoading({ email: false })
                if (!data.success) {
                    return handlerAlert({ status: "error", message: data.message })
                }

                handlerAlert({ status: "success", message: "The payment was successful." })
                plausible.trackEvent('Successful Payment')
            }
        } else if (query.get('canceled')) {
            navigate({ pathname: "/", search: "" })
            localStorage.removeItem('text-to-speech')
            handlerAlert({ status: "warning", message: "The payment was cancelled." })
        }
    }

    const getVoicesEleveLabs = async () => {
        handlerLoading({ voices: true })
        const data = await getVoices()
        handlerLoading({ voices: false })
        if (!data.success) {
            return handlerAlert({ status: "error", message: data.message })
        }
        setVoisec(data.voices.filter( voice => voice.name !== "Domi"))
    }

    const payment = async (values) => {
        const data = await createCheckoutSession(values)
        plausible.trackEvent('Create Order')
        if (data.success) {
            localStorage.setItem('text-to-speech', JSON.stringify({ ...values, session_id: data.session_id }));
            return window.location.replace(data.session_url);
        }
    }
    const generateAudio = async (values, audioref) => {
        const data = await getTextIntoSpeech({
            ...values,
            text: values.text.split(" ").slice(0, 30).join(" ")
        })
        if (!data.success) {
            return handlerAlert({ status: "error", message: data.message })
        }
        handlerAlert({ status: "success", message: "Sound generation was successful." })
        plausible.trackEvent('Generate')
        const blob = new Blob([data.content], { type: 'audio/mpeg' });
        const urlAudioBlob = URL.createObjectURL(blob);
        setAudioUrl(urlAudioBlob)
        if(audioref.current){
            audioref.current.pause();
            audioref.current.load();
            audioref.current.play();
        }
    }

    return (
        <Stack
            spacing={4}
            borderRadius={"16px"}
            w={'full'}
            maxW={'644px'}
            bg={'rgba(246, 245, 242, 1)'}
            boxShadow={'0px 16px 24px 0px rgba(64, 52, 16, 0.08)'}
            p={isLargerThan500 ? "16px 32px" : "32px 64px"}>
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
            <FormInput
                generateAudio={generateAudio}
                voices={voices}
                audioUrl={audioUrl}
                payment={payment}
                setAudioUrl={setAudioUrl}
            />
            <FormFooter />
        </Stack>
      )

}