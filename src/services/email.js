import { fetchNode } from "../lib/fetch"

const SEND_EMAIL = `/api/email/send-email`;

export const sendEmail = async (body) => {
    try {
        const response = await fetchNode(SEND_EMAIL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        await response.json()
        return {
            success: true
        }
    } catch (error) {
        return {
            ...error,
            success: false
        }
    }
}