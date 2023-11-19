import React, { useEffect, useState } from "react";
import { FormInput } from "./Form";
import { createCheckoutSession } from "../../services/stripe"
import { sendEmail } from "../../services/email"
import { getVoices, getTextIntoSpeech } from "../../services/elevenLabs"
import { FormFooter } from "./FormFooter"
import { Stack, Heading } from "@chakra-ui/react"

import "./homePage.css"

export const HomePage = ({ setLoading, setAlert, plausible }) => {
    const [voices, setVoisec] = useState([])
    const [audioUrl, setAudioUrl] = useState(null)

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
                setLoading((prev) => ({ ...prev, email: true }))
                const data = await sendEmail(body);
                setLoading((prev) => ({ ...prev, email: false }))
                if (!data.success) {
                    setAlert({ status: "error", message: data.message })
                    localStorage.removeItem('text-to-speech')
                    return setTimeout(() => setAlert(""), 3000);
                }
                setAlert({ status: "success", message: "The payment was successful." })
                setTimeout(() => setAlert(""), 5000);
                plausible.trackEvent('Successful Payment')
            }
        } else if (query.get('canceled')) {
            localStorage.removeItem('text-to-speech')
            // window.location.replace("/")
        }
    }

    const getVoicesEleveLabs = async () => {
        setLoading((prev) => ({ ...prev, voices: true }))
        const data = await getVoices()
        setLoading((prev) => ({ ...prev, voices: false }))
        if (!data.success) {
            setAlert({ status: "error", message: data.message })
            return setTimeout(() => setAlert(""), 3000);
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
            setAlert({ status: "error", message: data.message })
            return setTimeout(() => setAlert(""), 3000);
        }
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
            <FormInput
                generateAudio={generateAudio}
                voices={voices}
                audioUrl={audioUrl}
                payment={payment}
                setAudioUrl={setAudioUrl}
                setLoading={setLoading}
            />
            <FormFooter />
        </Stack>
      )

}