import React, { useEffect, useState } from "react";
import { FormInput } from "../../components";
import { createCheckoutSession } from "../../services/stripe"
import { sendEmail } from "../../services/email"
import { getVoices } from "../../services/elevenLabs"

import "./homePage.css"

export const HomePage = ({ setLoading, setAlert }) => {
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
                setAlert({ status: "success", message: "The payment was successful." })
                setTimeout(() => setAlert(""), 3000);
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
        if (data.success) {
            localStorage.setItem('text-to-speech', JSON.stringify({ ...values, session_id: data.session_id }));
            return window.location.replace(data.session_url);
        }
    }
    return ( <FormInput handler={handler} voices={voices} /> )
}