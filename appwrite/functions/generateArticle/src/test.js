const f = require('./index');

f({
	variables: {
		OPEN_API_KEY: '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',
		APPWRITE_FUNCTION_PROJECT_ID: 'techCrunchs',
		APPWRITE_FUNCTION_USER_ID: '6415a7bcb2fd41e4f399',
		APPWRITE_FUNCTION_ENDPOINT: 'https://cloud.appwrite.io/v1',
		APPWRITE_FUNCTION_API_KEY: 'b2ec4e0704188f7a768722c88cbaba5308ea35acc85603c8f7ea65be3524a67e1639cd076f3896ad199813a11e4dfb65702cf17320a18d0d2e7d045db43be1f288e279f9e26c7968822f34b20236a15c5170078b2cec78ad397199edb6494132d2c7f74a2b0892bb1d0e9d264a626bfdb38f2754578bf288dbbe7cb0c4410b19'
	},
	payload: JSON.stringify({
		title: 'Appwrite Cloud adds Mars region',
		categoryId: 'startups'
	})
}, {
	json: (msg) => {
		console.log(msg);
	}
});