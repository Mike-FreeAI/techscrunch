import { Client, Databases, Query, Storage, type Models } from 'appwrite';

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('techCrunchs');
const databases = new Databases(client);
const storage = new Storage(client);

export type Category = {
	name: string;
	description: string;
} & Models.Document;

export type Author = {
	articleId: string;
	name: string;
} & Models.Document;

export type Promotion = {
	articleId: string;
} & Models.Document;

export type Pin = {
	articleId: string;
} & Models.Document;

export type Article = {
	title: string;
	content: string;
	categoryId: string;
	imageId: string;

	// Front-end only
	promoted?: boolean;
	category?: Category;
	author?: Author;
	verboseDate: string;
} & Models.Document;

export const PageSize = {
	Articles: 10
};

function getVerboseDate(dateStr: string) {
	const date = new Date(dateStr);
	const hours = date.getHours();
	const verboseDate = `${hours % 12}:${date.getMinutes()} ${hours >= 12 ? 'PM' : 'AM'} • ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	return verboseDate;
}

export const AppwriteService = {
	getPins: async () => {
		return await databases.listDocuments<Pin>('default', 'pins', [
			Query.limit(4),
		]);
	},
	listCategories: async () => {
		return await databases.listDocuments<Category>('default', 'categories', [
			Query.limit(10),
			Query.equal('hidden', false)
		]);
	},
	getCategories: async (categoryIds: string[]) => {
		return await databases.listDocuments<Category>('default', 'categories', [
			Query.equal('$id', categoryIds)
		]);
	},
	getCategory: async (categoryId: string) => {
		return await databases.getDocument<Category>('default', 'categories', categoryId);
	},
	getAuthor: async (articleId: string) => {
		const response = await databases.listDocuments<Author>('default', 'authors', [
			Query.limit(1),
			Query.equal('articleId', articleId)
		]);

		return response.documents[0] ?? undefined;
	},
	isPromoted: async (articleId: string) => {
		const response = await databases.listDocuments<Author>('default', 'promotions', [
			Query.limit(1),
			Query.equal('articleId', articleId)
		]);

		return response.documents.length > 0;
	},
	arePromoted: async (articleIds: string[]) => {
		const response = await databases.listDocuments<Author>('default', 'promotions', [
			Query.equal('articleId', articleIds)
		]);

		const obj: { [key: string]: boolean } = {};

		for(const articleId of articleIds) {
			obj[articleId] = response.documents.find((promotion) => promotion.articleId === articleId) ? true : false;
		}

		return obj;
	},
	getAuthors: async (articleIds: string[]) => {
		return await databases.listDocuments<Author>('default', 'authors', [
			Query.equal('articleId', articleIds)
		]);
	},
	getArticle: async (articleId: string) => {
		const article = await databases.getDocument<Article>('default', 'articles', articleId);

		article.verboseDate = getVerboseDate(article.$createdAt);

		const [ category, author, promoted ] = await Promise.all([
			await AppwriteService.getCategory(article.categoryId),
			await AppwriteService.getAuthor(article.$id),
			await AppwriteService.isPromoted(article.$id)
		]);

		article.category = category;
		article.author = author;
		article.promoted = promoted;

		return article;
	},
	getArticles: async (queries?: string[]) => {
		if(!queries) {
			queries = [];
		}

		queries.push(...[Query.limit(PageSize.Articles + 1)]);

		const articles = await databases.listDocuments<Article>('default', 'articles', queries);

		articles.documents = articles.documents.map((article) => {
			return {
				...article,
				verboseDate: getVerboseDate(article.$createdAt)
			};
		});

		const categoryIds = [...new Set(articles.documents.map((article) => article.categoryId))];
		const articleIds = [...new Set(articles.documents.map((article) => article.$id))];

		const [ categories, authors, promotions ] = await Promise.all([
			(async () => {
				if (categoryIds.length > 0) {
					return (await AppwriteService.getCategories(categoryIds)).documents;
				}

				return [];
			})(),

			(async () => {
				if (articleIds.length > 0) {
					return (await AppwriteService.getAuthors(articleIds)).documents;
				}

				return [];
			})(),

			(async () => {
				if (articleIds.length > 0) {
					return await AppwriteService.arePromoted(articleIds);
				}

				return {};
			})()
		]);

		articles.documents = articles.documents.map((article) => {
			return {
				...article,
				category: categories.find((category) => category.$id === article.categoryId),
				author: authors.find((author) => author.articleId === article.$id),
				promoted: promotions[article.$id]
			};
		});

		return articles;
	},
	getThumbnail: (fileId: string, width?: number, height?: number) => {
		return storage.getFilePreview('thumbnails', fileId, width ? width : 500, height).toString();
	}
};
