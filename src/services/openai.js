import { fetchNode } from "../lib/fetch"

const GENERATE_TEXT = "/api/openai/generate-text"

export const generateText = async (body) => {
    try {
        const response = await fetchNode(GENERATE_TEXT, {
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
export const generateText2 = async (body) => {
    try {
        const url = `https://api.openai.com/v1/chat/completions`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": "Who won the world series in 2020?"
                },
                {
                    "role": "assistant",
                    "content": "The Los Angeles Dodgers won the World Series in 2020."
                },
                {
                    "role": "user",
                    "content": "Where was it played?"
                }
            ],
            "model": "gpt-3.5-turbo"
        })
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