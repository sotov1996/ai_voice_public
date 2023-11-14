import { fetchNode } from "../lib/fetch"

const GENERATE_TEXT = "/api/openai/generate-text"

export const generateText = async (body) => {
    try {
        const response = await fetchNode(GENERATE_TEXT, {
            method: "POST",
            headers: {
                "accept": "application/json"
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