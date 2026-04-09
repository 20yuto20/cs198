# AniTracker 🎬

A full-stack anime tracking web application built with React + TypeScript (Vite) and Express.js + SQLite.

## Features

- 🔍 **Anime Search**: Search anime using the Jikan API (MyAnimeList)
- 📺 **Anime Details**: View detailed info including synopsis, genres, score, episodes
- 📚 **My List**: Save anime to your personal list with status (watching/completed/plan to watch), ratings, and reviews
- 🗂 **Status Filtering**: Filter your list by status
- 🎨 **Premium Dark UI**: Modern glassmorphism design with smooth animations

## Tech Stack

- **Frontend**: React + TypeScript, Vite, React Router, Axios
- **Backend**: Express.js, better-sqlite3
- **External API**: [Jikan API](https://jikan.moe/) (MyAnimeList unofficial API)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Running

1. **Clone the repo**
```bash
git clone <your-repo-url>
cd Project2
```

2. **Start the backend**
```bash
cd server
npm install
node index.js
```
Server runs on http://localhost:3001

3. **Start the frontend** (in a new terminal)
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mylist` | Get all saved anime |
| POST | `/api/mylist` | Add anime to list |
| PUT | `/api/mylist/:id` | Update an entry |
| DELETE | `/api/mylist/:id` | Remove an entry |

## External API

This app uses the [Jikan API v4](https://docs.api.jikan.moe/) for:
- Searching anime by title
- Fetching anime details by MAL ID
- Getting top/trending anime
