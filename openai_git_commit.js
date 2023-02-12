// #popclip
// name: OpenAI Git Commit Message Improvement
// icon: iconify:eos-icons:ai
// language: javascript
// after: preview-result
// entitlements: [network]
// options: [{identifier: apikey, label: API Key, type: string,
//   description: 'Obtain API key from https://platform.openai.com/account/api-keys'}]
const axios = require("axios");
// base object for communicating with OpenAI
const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/',
    headers: {Authorization: `Bearer ${popclip.options.apikey}`}
});
const message = popclip.input.text

// use the GPT-3 model (note - can change/add other params here)
const data = {
    "model": "text-davinci-003",
    "prompt": "Improve this git commit message, don't modify prefix start from [ to ]:" + message,
    "temperature": 0.8,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
}

// send query to OpenAI's `completions` service
const response = await openai.post('completions', data);
// return the prefix + the improved commit message
const result = response.data.choices[0].text;
return result.replace(/\r?\n/g, '');
