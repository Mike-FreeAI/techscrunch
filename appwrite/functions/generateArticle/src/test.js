const axios = require('axios');

(async () => {
    const question = "Tell me you love me";
    console.log(question);
    console.log("...");
	const res = await axios.default.post(
		'https://api.openai.com/v1/chat/completions',
		JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: question }],
			temperature: 0.7
		}),
		{
			headers: {
				Authorization: 'Bearer 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',
				'Content-Type': 'application/json'
			}
		}
	);
    console.log(res.data.choices[0].message.content);
})();
