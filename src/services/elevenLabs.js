import { fetchNode } from "../lib/fetch"
import axios from "axios"

const GET_VOICES = "https://api.elevenlabs.io/v1/voices"
const TEXT_INTO_SPEECH= "https://api.elevenlabs.io/v1/text-to-speech"

const { REACT_APP_X_APY_KEY_ELEVENLABS } = process.env

export const getVoices = async (body) => {
    try {
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

/* export const getTextIntoSpeech = async (body) => {
    try {
        const response = await fetchNode(TEXT_INTO_SPEECH, {
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
} */

export const getTextIntoSpeech = async ({ text, voice_id, voice_settings }) => {
    try {
        const url = `${TEXT_INTO_SPEECH}/${voice_id}`
        const apiRequestOptions = {
        method: 'POST',
        url: url,
        headers: {
            accept: 'audio/mpeg',
            'content-type': 'application/json',
            'xi-api-key': process.env.REACT_APP_X_APY_KEY_ELEVENLABS,
        },
        data: {
            text,
            "model_id": "eleven_multilingual_v2",
            voice_settings
        },
        responseType: 'arraybuffer'
        };
    
        const apiResponse = await axios.request(apiRequestOptions);
        return {
            content: apiResponse.data,
            success: true
        }
    } catch (error) {
        return {
            ...error,
            success: false
        }
    }
}