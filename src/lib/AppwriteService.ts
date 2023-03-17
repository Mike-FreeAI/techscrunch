import { Client, Databases, Query, Storage, type Models } from 'appwrite';

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('techCrunchs');
const databases = new Databases(client);
const storage = new Storage(client);

export type Category = {
	name: string;
	description: string;
} & Models.Document;

export type Article = {
	title: string;
	author: string;
	content: string;
	categoryId: string;
	imageId: string;

	// Front-end only
	category?: Category;
	verboseDate: string;
} & Models.Document;

export const PageSize = {
	Articles: 2
};

function getVerboseDate(dateStr: string) {
	const date = new Date(dateStr);
	const hours = date.getHours();
	const verboseDate = `${hours % 12}:${date.getMinutes()} ${hours >= 12 ? 'PM' : 'AM'} • ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	return verboseDate;
}

export const AppwriteService = {
	listCategories: async () => {
		return await databases.listDocuments<Category>('default', 'categories', [
			Query.limit(10),
			Query.orderDesc('$createdAt')
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
	getArticle: async (articleId: string) => {
		const article = await databases.getDocument<Article>('default', 'articles', articleId);

		article.verboseDate = getVerboseDate(article.$createdAt);
		article.category = await AppwriteService.getCategory(article.categoryId);

		return article;
	},
	getArticles: async (categoryId?: string, cursor?: string) => {
		const queries = [Query.limit(PageSize.Articles + 1), Query.orderDesc('$createdAt')];

		if (cursor) {
			queries.push(Query.cursorAfter(cursor));
		}

		if (categoryId) {
			queries.push(Query.equal('categoryId', categoryId));
		}

		const articles = await databases.listDocuments<Article>('default', 'articles', queries);

		articles.documents = articles.documents.map((article) => {
			return {
				...article,
				verboseDate: getVerboseDate(article.$createdAt)
			};
		});

		const categoryIds = [...new Set(articles.documents.map((article) => article.categoryId))];
		if (categoryIds.length > 0) {
			const categories = await AppwriteService.getCategories(categoryIds);

			articles.documents = articles.documents.map((article) => {
				return {
					...article,
					category: categories.documents.find((category) => category.$id === article.categoryId)
				};
			});
		}

		return articles;
	},
	getThumbnail: (fileId: string, size?: number) => {
		return storage.getFilePreview('thumbnails', fileId, size ? size : 500).toString();
	}
};
