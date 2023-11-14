const axios = require('axios');

const getTextIntoSpeech = async (body) => {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}`
    const apiRequestOptions = {
      method: 'POST',
      url: url,
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': process.env.X_APY_KEY_ELEVENLABS,
      },
      data: {
        text: body.text
        ,
        "model_id": "eleven_multilingual_v2",
        voice_settings: body.voice_settings
      },
      responseType: 'arraybuffer'
    };
  
    const apiResponse = await axios.request(apiRequestOptions);
    return apiResponse.data;
}

const getVoices = async () => {
    const url = `https://api.elevenlabs.io/v1/voices`
    const apiRequestOptions = {
      method: 'GET',
      url: url,
      headers: {
        'content-type': 'application/json',
        'xi-api-key': process.env.X_APY_KEY_ELEVENLABS,
      },
      responseType: 'json'
    };
  
    const apiResponse = await axios.request(apiRequestOptions);
    return apiResponse.data;
}

module.exports = {
    getTextIntoSpeech,
    getVoices
}