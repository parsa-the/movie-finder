import { Client, Databases, Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export const updatesearchcount = async (search, movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", search),
    ]);
    if (result.documents.length > 0) {
      const documentId = result.documents[0].$id;
      // Increment the count for the existing document
      const updatedCount = result.documents[0].count + 1;
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
        count: updatedCount,
      });
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", {
        searchTerm: search,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(`Error updating search count: ${error}`);
  }
};
export const getTrendingMovies = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return response.documents;
  } catch (error) {
    console.error(`Error fetching trending movies: ${error}`);
    return [];
  }
};
