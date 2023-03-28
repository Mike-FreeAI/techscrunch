import { Account, Client, Databases, Functions, ID, Query, Storage, type Models } from 'appwrite';

const client = new Client().setEndpoint('https://appwrite.techscrunch.dev/v1').setProject('techCrunchs');
const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);
const functions = new Functions(client);

export type Category = {
	name: string;
	description: string;
} & Models.Document;

export type Article = {
	title: string;
	content: string;
	categoryId: string;
	imageId: string;
	
	authorName: string;
	authorBio: string;
	authorId: string;
	authorImage: string;

	// Front-end only
	category?: Category;
	verboseDate: string;
} & Models.Document;

export const PageSize = {
	Articles: 10
};

function getVerboseDate(dateStr: string) {
	const date = new Date(dateStr);
	const hours = date.getHours();
	const verboseDate = `${hours % 12}:${date.getMinutes()} ${
		hours >= 12 ? 'PM' : 'AM'
	} • ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	return verboseDate;
}

export const AppwriteService = {
	generateArticle: async (title: string, category: string) => {
		const res = await functions.createExecution('generateArticle', JSON.stringify({title, categoryId: category}));

		if(res.status === 'failed') {
			throw new Error('Internal Error. Try again later.');
		}
		if(res.response) {
			const json = JSON.parse(res.response);
			if(json.success === false) {
				throw new Error(json.msg);
			}
		}

		return res;
	},
	updateName: async (name: string) => {
		return await account.updateName(name);
	},
	updatePrefs: async (prefs: any) => {
		return await account.updatePrefs(prefs);
	},
	uploadProfilePicture: async (file: any) => {
		return await storage.createFile('profilePictures', ID.unique(), file);
	},
	changePassword: async (oldPassword: string, newPassword: string) => {
		return await account.updatePassword(newPassword, oldPassword);
	},
	resetPassword: async (email: string) => {
		return await account.createRecovery(email, `${window.location.origin}/auth/password-reset`);
	},
	resetPasswordFinish: async (userId: string, secret: string, password: string, passwordAgain: string) => {
		return await account.updateRecovery(userId, secret, password, passwordAgain)
	},
	oauthLogin: () => {
		account.createOAuth2Session('github', `${window.location.origin}/`, `${window.location.origin}/auth/login`);
	},
	login: async (email: string, password: string) => {
		return await account.createEmailSession(email, password);
	},
	register: async (name: string, email: string, password: string) => {
		return await account.create(ID.unique(), email, password, name);
	},
	logout: async () => {
		return await account.deleteSession('current');
	},
	getAccount: async () => {
		try {
			return await account.get();
		} catch (err) {
			console.log(err);
			return null;
		}
	},
	listCategories: async () => {
		return await databases.listDocuments<Category>('default', 'categories', [
			Query.limit(10),
			Query.equal('hidden', false),
			Query.orderDesc('$createdAt')
		]);
	},
	getCategories: async (categoryIds: string[]) => {
		return await databases.listDocuments<Category>('default', 'categories', [
			Query.equal('$id', categoryIds),
			Query.orderDesc('$createdAt')
		]);
	},
	getCategory: async (categoryId: string) => {
		return await databases.getDocument<Category>('default', 'categories', categoryId);
	},
	getArticle: async (articleId: string) => {
		const article = await databases.getDocument<Article>('default', 'articles', articleId);

		article.verboseDate = getVerboseDate(article.$createdAt);
		article.category = await AppwriteService.getCategory(article.categoryId);
		
		return article;
	},
	getArticles: async (queries?: string[]) => {
		if (!queries) {
			queries = [];
		}

		queries.push(...[Query.limit(PageSize.Articles + 1), Query.orderDesc('$createdAt')]);

		const articles = await databases.listDocuments<Article>('default', 'articles', queries);

		const categoryIds = [...new Set(articles.documents.map((article) => article.categoryId))];
		
		let categories: Category[] = []; 

		if (categoryIds.length > 0) {
			categories = (await AppwriteService.getCategories(categoryIds)).documents;
		}

		articles.documents = articles.documents.map((article) => {
			return {
				...article,
				category: categories.find((category) => category.$id === article.categoryId),
				verboseDate: getVerboseDate(article.$createdAt)
			};
		});

		return articles;
	},
	getThumbnail: (fileId: string, width?: number, height?: number) => {
		return storage.getFilePreview('thumbnails', fileId, width ? width : 500, height, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'webp').toString();
	},
	getProfileImage: (fileId: string, width?: number, height?: number) => {
		return storage.getFilePreview('profilePictures', fileId, width ? width : 500, height, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'webp').toString();
	}
};
