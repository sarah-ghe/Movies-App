import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchTerm = async (searchTerm, movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    console.log("Search term query result:", result);
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      const updatedCount = (doc.count || 0) + 1;

      const res = await databases.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
        count: updatedCount,
      });
      console.log("Updated document:", res);
    } else {
      await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search term:", error);
  }
};
/**
 * Placeholder for search count update via REST API
 */
export const updateSearchCount = async (searchTerm, movie) => {
  console.log('updateSearchCount not implemented yet.');
};

/**
 * Fetch top trending movies from Appwrite
 */
export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return result.documents;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
