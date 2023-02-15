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
let prompt = '';
// three case
// 1. if the message is included prefix with [prefix], set prompt as `Improve this git commit message`
// 2. if the message is start with '//', set prompt as `Improve this code comment`
// 3. otherwise, set prompt as  `Help me generate code comment, keep it as short as possible`
if (message.startsWith('[')) {
    prompt = `Improve this git commit message, don't modify prefix start from [ to ]: ${message}`;
} else if (message.startsWith('//')) {
    prompt = `Improve this code comment: ${message}`;
} else {
    prompt = `Help me generate code comment, keep it as short as possible: ${message}`;
}

// use the GPT-3 model (note - can change/add other params here)
const data = {
    "model": "text-davinci-003",
    "prompt": prompt,
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
