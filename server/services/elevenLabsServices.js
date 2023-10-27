const axios = require('axios');

const getTextIntoSpeech = async ({ text, voice_id, voice_settings }) => {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`
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
    return apiResponse.data;
}

module.exports = {
    getTextIntoSpeech
}