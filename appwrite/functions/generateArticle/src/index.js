const axios = require('axios');
const sdk = require('node-appwrite');
const { Readable } = require('stream');

async function generateThumbnail(topic, storage, req) {
	const question = 'stock picture in 2 words for article with title: ' + topic;

	const res0 = await axios.default.post(
		'https://api.openai.com/v1/chat/completions',
		JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: question }]
		}),
		{
			headers: {
				Authorization: 'Bearer ' + req.variables['OPEN_API_KEY'],
				'Content-Type': 'application/json'
			}
		}
	);

	const imgTopic = res0.data.choices[0].message.content;

	console.log(imgTopic); 

	const res = await axios.default.post(
		'https://api.openai.com/v1/images/generations',
		JSON.stringify({
			prompt: imgTopic,
			size: '1024x1024',
			response_format: 'url'
		}),
		{
			headers: {
				Authorization: 'Bearer ' + req.variables['OPEN_API_KEY'],
				'Content-Type': 'application/json'
			}
		}
	);

	const url = res.data.data[0].url;
	const bufferFile = await axios.default.get(url, {
		responseType: 'arraybuffer'
	});

	const stream = Readable.from(bufferFile.data);

	const file = await storage.createFile(
		'thumbnails',
		sdk.ID.unique(),
		sdk.InputFile.fromStream(stream, 'thumbnail.png', bufferFile.data.toString().length)
	);
	return file.$id;
}

async function generateContent(category, topic, req) {
	const question =
		'Generate article for category "' +
		category +
		'" about "' +
		topic +
		". Make it funny and use real names. At the end say it's 1st april fool. Make it at least 500 words long.";
	const res = await axios.default.post(
		'https://api.openai.com/v1/chat/completions',
		JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: question }]
		}),
		{
			headers: {
				Authorization: 'Bearer ' + req.variables['OPEN_API_KEY'],
				'Content-Type': 'application/json'
			}
		}
	);

	return res.data.choices[0].message.content;
}

async function handle(req, res) {
	const client = new sdk.Client();
	const databases = new sdk.Databases(client);
	const storage = new sdk.Storage(client);
	const users = new sdk.Users(client);

	if (
		!req.variables['OPEN_API_KEY'] ||
		!req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
		!req.variables['APPWRITE_FUNCTION_API_KEY']
	) {
		throw new Error('Missing variables. Please configure function.');
	}

	client
		.setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
		.setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
		.setKey(req.variables['APPWRITE_FUNCTION_API_KEY']);

	const payload = JSON.parse(req.payload ?? '{}');

	if (!payload.title) {
		throw new Error('Please specify title.');
	}

	if (!payload.categoryId) {
		throw new Error('Please specify category.');
	}

	const title = payload.title;
	const categoryId = payload.categoryId;
	let category;

	try {
		category = await databases.getDocument('default', 'categories', categoryId);
	} catch (err) {
		throw new Error('Category not found.');
	}

	const userId = req.variables['APPWRITE_FUNCTION_USER_ID'];
	const user = await users.get(userId);
	const prefs = user.prefs;

	const userName = user.name ?? 'Anonymous';
	const userBio = prefs.bio ?? 'No bio.';
	const userImage = prefs.imageId ?? '';

	const [content, imageId] = await Promise.all([
		generateContent(category.name, title, req),
		generateThumbnail(title, storage, req)
	]);

	const doc = await databases.createDocument('default', 'articles', sdk.ID.unique(), {
		content,
		imageId,
		title,
		categoryId,
		authorName: userName,
		authorImage: userImage,
		authorBio: userBio,
		isPromoted: Math.random() < 0.2,
		isPinned: false,
		authorId: userId
	});

	res.json({
		success: true,
		id: doc.$id
	});
}

module.exports = async function (req, res) {
	try {
		await handle(req, res);
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			msg: err.message
		});
	}
};
