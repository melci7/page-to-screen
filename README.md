# Page to Screen

A Next.js app showcasing book-to-movie adaptations. This application bridges the worlds of literature and cinema, providing detailed information about books and their corresponding film adaptations. Designed for book and movie enthusiasts, it offers a comprehensive view of literary works and their cinematic counterparts.

## Features

- **Book and Movie Integration**: Combines data from the Google Books API and The Movie Database (TMDB) API.
- **Streaming Availability**: Displays where movies can be streamed.
- **Detailed View**: Includes book summaries, author information, movie overviews, cast details, and ratings.
- **Search and Explore**: Users can search for specific books or movies and discover adaptations.
- **Responsive Design**: Ensures a seamless experience across all devices with Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React-based framework for server-rendered and static websites)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS framework)
- **APIs**: [Google Books API](https://developers.google.com/books) and [TMDB API](https://developers.themoviedb.org/)
- **State Management**: Context API for managing global state

## Installation and Setup

To run the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/melci7/page-to-screen.git
   cd page-to-screen
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your-google-books-api-key
   NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Screenshots

![Homepage Screenshot](https://i.imgur.com/9BxsYwn.png)
![Book and Movie Details Screenshot](https://i.imgur.com/hSOxF84.png)

## Contact

If you have any questions or need further assistance, feel free to contact me:

- Email: [melci721@gmail.com](mailto:melci721@gmail.com)
- LinkedIn: [Muhammed Emrullah Elçi](https://www.linkedin.com/in/muhammed-elci/)
