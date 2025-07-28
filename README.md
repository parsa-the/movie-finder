# 🎬 Movie Finder

A modern, responsive React application that helps you discover and search for movies using the TMDB API. Built with React, Vite, and enhanced with beautiful animations and a sleek UI.

![Movie Finder](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.0-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🔍 Real-time Movie Search**: Search for movies using the TMDB API with instant results
- **⭐ Movie Ratings**: View movie ratings, release dates, and language information
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎭 Animated Components**: Smooth animations using Framer Motion and GSAP
- **💾 Search Analytics**: Track and store search patterns using Appwrite backend

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- TMDB API key
- Appwrite account (for search analytics)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Movie
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory and add your API keys:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Get API Keys**

   - **TMDB API**: Sign up at [The Movie Database](https://www.themoviedb.org/settings/api) to get your API key
   - **Appwrite**: Create an account at [Appwrite](https://appwrite.io/) and set up a database with a collection for storing search analytics

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173` to see the application running.


## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### TMDB API Configuration

The app uses TMDB's API for movie data. Make sure to:

- Get your API key from TMDB
- Add it to your `.env` file
- The API automatically handles movie posters, ratings, and metadata

### Appwrite Configuration

For search analytics, configure Appwrite:

- Create a new project
- Set up a database with a collection
- Add the necessary environment variables
- The collection should have fields: `searchTerm`, `count`, `movie_id`, `poster_url`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [Appwrite](https://appwrite.io/) for backend services
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you have any questions or need help, feel free to:

- Open an issue on GitHub
- Contact the maintainers

---

**Made with ❤️ using React and Vite**
