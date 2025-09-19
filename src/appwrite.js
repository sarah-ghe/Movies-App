import {Client, Databases, ID, Query} from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);


const database = new Databases(client);

export const updateSearchTerm = async(searchTerm, movie) => {
  //1.use appwrite sdk to check if search term exists
  try {
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal('searchTerm', searchTerm)
    ])
  //2.if exists, update count +1
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      const updatedCount = doc.count + 1;
      await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {count: updatedCount});
      
  //3.if not exists, create new record with count = 1
      } else {
          await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url:'https://image.tmdb.org/t/p/w500${movie.poster_path}',
        });
      }
    console.log(result);        
  } catch (error) {
    console.error(error);
  }
}



export const updateSearchCount = async(searchTerm, movie) => {
  const url = `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${TABLE_ID}/documents`;
  console.log(PROJECT_ID, DATABASE_ID, TABLE_ID);
  };

export const getTrendingMovies = async() => {
  try {
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ]);

    return result.documents;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
}