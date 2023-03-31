const axios = require('axios');
const sdk = require('node-appwrite');
const { Readable } = require('stream');

function toBase62(n) {
	if (n === 0) {
	  return '0';
	}
	var digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var result = ''; 
	while (n > 0) {
	  result = digits[n % digits.length] + result;
	  n = parseInt(n / digits.length, 10);
	}
	
	return result;
  }

async function generateTags(topic, req) {
	const question = 'I need you to generate 3 tech single word news related tags based on this title: `' + topic + '`. Separate them by comma and make words spearated by dash.';

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

	const tags = res.data.choices[0].message.content.split(',').map((tag) => {
		return tag.trim().split(' ').join('-').toLowerCase();
	});

	return tags;
}

async function getPixabayUrl(topic, req) {
	try {
		const url = `https://pixabay.com/api/?key=${req.variables['PIXABAY_KEY']}&q=${topic.split(' ').join('+')}&image_type=photo`;
		const res = await axios.default.get(
			url,
		);
	
		return res.data?.hits[0]?.largeImageURL ?? null;
	} catch(err) {
		console.log(err);
	}

	return null;
}

async function getDalleUrl(topic, req) {
	const res = await axios.default.post(
		'https://api.openai.com/v1/images/generations',
		JSON.stringify({
			prompt: topic,
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

	return res.data.data[0].url;
}

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

	let url = await getPixabayUrl(imgTopic, req);

	if(!url) {
		url = await getDalleUrl(imgTopic, req);
	}

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
		". Make it funny and use real names. Make it at least 500 words long. In last paragraph, mention it's 1st april fool.";
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

	const doc = await databases.createDocument('default', 'articles', sdk.ID.unique(), {
		published: false,
		content: '',
		imageId: '',
		title,
		categoryId,
		shortId: toBase62(Date.now()),
		isPromoted: Math.random() < 0.2,
		isPlus: Math.random() < 0.2,
		isPinned: false,
		authorId: user.prefs.profileId
	});

	(async () => {
		const [content, imageId, tags] = await Promise.all([
			generateContent(category.name, title, req),
			generateThumbnail(title, storage, req),
			generateTags(title, req)
		]);

		for(const tag of tags) {
			let tagId;

			const tagResponse = await databases.listDocuments('default', 'tags', [ sdk.Query.limit(1), sdk.Query.equal('name', tag) ]);
			if(tagResponse.documents.length <= 0) {
				const tagDoc = await databases.createDocument('default', 'tags', sdk.ID.unique(), {
					name: tag
				});
				tagId = tagDoc.$id;
			} else {
				tagId = tagResponse.documents[0].$id;
			}

			await databases.createDocument('default', 'articleTags', sdk.ID.unique(), {
				articleId: doc.$id,
				tagId
			});
		}

		await databases.updateDocument('default', 'articles', doc.$id, {
			published: true,
			content,
			imageId
		});
	})()

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
