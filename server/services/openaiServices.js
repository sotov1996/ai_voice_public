const fetch = require('node-fetch')

const generateText = async (body) => {
    const { text } = body
    if (process.env.MODE === "dev") {
        const data = {
            "id": "chatcmpl-8MDYB8RLC2Bl7y8vUXSf64YC76Ntl",
            "object": "chat.completion",
            "created": 1700305995,
            "model": "gpt-3.5-turbo-0613",
            "choices": [
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": "\"Unleash your potential, seize opportunities, and create lasting wealth. It's time to fulfill your dreams, Ilya Sotov!\""
                    },
                    "finish_reason": "stop"
                }
            ],
            "usage": {
                "prompt_tokens": 30,
                "completion_tokens": 29,
                "total_tokens": 59
            }
        }
        const contents = data.choices.reduce((acc, choice) => {
            acc += choice.message.content
            return acc
        }, "")
        return {
            content: contents
        }
    }
    const url = `https://api.openai.com/v1/chat/completions`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": `${text} up to 1000 characters`
                }
            ],
            "model": "gpt-3.5-turbo"
        })
    })
    if (!response.ok) {
        console.log(response)
        const error = new Error();
        error.status = response.status;
        error.message = await response.text();
        throw error
    }
    const data = await response.json()
    const contents = data.choices.reduce((acc, choice) => {
        acc += choice.message.content
        return acc
    }, "")
    return {
        content: contents
    }
}

module.exports = {
    generateText
}