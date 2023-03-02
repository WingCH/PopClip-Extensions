// #popclip
// name: OpenAI assistant
// icon: iconify:logos:openai-icon
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

const data = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful development assistant who helps me with the following questions, give the answer directly without any other description, each of the following cases is independent and should not interfere with each other."
        },
        {
            "role": "system",
            "content": "Case 1: When you receive text in the following format, do not modify the prefix, improve the git commit message \n Format: prefix + git commit message \n prefix is from '[' to ']', The remaining is the git commit message, answer format should be prefix + git commit message"
        },
        {
            "role": "system",
            "content": "Case 2: When you receive text that starts with '//', it means it is a comment in the code, which helps me to improve the grammar and structure of the comment so that my colleagues can understand it more easily"
        },
        {
            "role": "system",
            "content": "If the above case also does not match, assuming the text is code, please try to explain, not too long, the answer should start with '//'"
        },
        {
            "role": "user",
            "content": message
        }
    ]
}

// send query to OpenAI's `completions` service
const response = await openai.post('chat/completions', data);
// return the prefix + the improved commit message
const result = response.data.choices[0].message.content;
return result.replace(/\r?\n/g, '');
