const axios = require('axios');
const fetch = require('node-fetch')

const generateText = async (text) => {
    const url = `https://api.openai.com/v1/chat/completions`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
            "Accept-Encoding": "gzip, deflate, br"
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
    if (!response.ok) {
        console.log(response)
        const error = new Error();
        error.status = response.status;
        error.message = await response.text();
        throw error
    }
    const data = await response.json()
    return data;
}

module.exports = {
    generateText
}