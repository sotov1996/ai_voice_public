import { fetchNode } from "../lib/fetch"

const GET_VOICES = "https://api.elevenlabs.io/v1/voices"

export const getVoices = async (body) => {
    try {
        const { REACT_APP_X_APY_KEY_ELEVENLABS } = process.env
        const response = await fetchNode(GET_VOICES, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "xi-api-key": REACT_APP_X_APY_KEY_ELEVENLABS
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