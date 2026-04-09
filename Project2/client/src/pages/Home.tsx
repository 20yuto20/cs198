import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

interface AnimeResult {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            large_image_url: string;
        };
    };
    score: number;
    episodes: number;
}

function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<AnimeResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [topAnime, setTopAnime] = useState<AnimeResult[]>([]);

    // Load top anime on mount
    useEffect(() => {
        const fetchTop = async () => {
            try {
                const res = await axios.get('https://api.jikan.moe/v4/top/anime?limit=12');
                setTopAnime(res.data.data);
            } catch (err) {
                console.error('Failed to fetch top anime:', err);
            }
        };
        fetchTop();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`);
            setResults(res.data.data);
        } catch (err) {
            console.error('Search failed:', err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const displayAnime = searched ? results : topAnime;

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1 className="hero-title">
                    Discover & Track Your <span className="gradient-text">Anime</span>
                </h1>
                <p className="hero-subtitle">
                    Search for anime, save your favorites, and keep track of what you're watching.
                </p>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for an anime..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button" disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>
            </div>

            <section className="results-section">
                <h2 className="section-title">
                    {searched ? `Search Results` : '🔥 Trending Anime'}
                </h2>
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading anime...</p>
                    </div>
                ) : displayAnime.length > 0 ? (
                    <div className="anime-grid">
                        {displayAnime.map((anime) => (
                            <AnimeCard
                                key={anime.mal_id}
                                id={anime.mal_id}
                                title={anime.title}
                                imageUrl={anime.images.jpg.large_image_url}
                                score={anime.score}
                                episodes={anime.episodes}
                            />
                        ))}
                    </div>
                ) : searched ? (
                    <div className="empty-state">
                        <p>No results found. Try a different search term.</p>
                    </div>
                ) : null}
            </section>
        </div>
    );
}

export default Home;
