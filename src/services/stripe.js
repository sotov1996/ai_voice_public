import { fetchNode } from "../lib/fetch"

const CREATE_CHECKOUT_SESSION = `/api/stripe/create-checkout-session`;

export const createCheckoutSession = async (body) => {
    try {
        const response = await fetchNode(CREATE_CHECKOUT_SESSION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return {
            ...data,
            success: true
        }
    } catch (error) {
        return {
            ...error,
            success: false
        }
    }
}