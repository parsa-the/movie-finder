
##  Features

-  Real-time Movie Search 
-  Responsive Design
-  Fast Performance
-  Animated Components
-  Search Analytics

##  Getting Started

### What i used:

- Node.js (version 16 or higher)
- npm or yarn package manager
- TMDB API key
- Appwrite account (for search analytics)


----------
- **Environment Setup**

   Create a ".env" file in the root directory and add your API keys:

  - VITE_TMDB_API_KEY=your_tmdb_api_key_here
  
  - VITE_APPWRITE_ID=your_appwrite_project_id
  
  - VITE_APPWRITE_DATABASE_ID=your_database_id
  
  - VITE_APPWRITE_COLLECTION_ID=your_collection_id
   

- **Get API Keys**

   - **TMDB API** : https://www.themoviedb.org/settings/api
   - **Appwrite** : https://appwrite.io/


### Appwrite Configuration

For search analytics, configure Appwrite:

- Create a new project
- Set up a database with a collection
- Add the necessary environment variables
- The collection should have fields: `searchTerm`, `count`, `movie_id`, `poster_url`

---

**Made with ❤️ using React and Vite**
