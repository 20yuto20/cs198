import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

interface MyListEntry {
    id: number;
    anime_id: number;
    title: string;
    image_url: string;
    status: string;
    rating: number;
    review: string;
    created_at: string;
}

function MyList() {
    const [entries, setEntries] = useState<MyListEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchMyList();
    }, []);

    const fetchMyList = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/mylist');
            setEntries(res.data);
        } catch (err) {
            console.error('Failed to fetch my list:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/api/mylist/${id}`);
            setEntries((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    const filteredEntries =
        filter === 'all' ? entries : entries.filter((e) => e.status === filter);

    const statusCounts = {
        all: entries.length,
        watching: entries.filter((e) => e.status === 'watching').length,
        completed: entries.filter((e) => e.status === 'completed').length,
        plan_to_watch: entries.filter((e) => e.status === 'plan_to_watch').length,
    };

    const statusLabels: Record<string, string> = {
        watching: 'Watching',
        completed: 'Completed',
        plan_to_watch: 'Plan to Watch',
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading your list...</p>
            </div>
        );
    }

    return (
        <div className="mylist-page">
            <div className="mylist-header">
                <h1 className="mylist-title">
                    📚 My <span className="gradient-text">Anime List</span>
                </h1>
                <p className="mylist-subtitle">{entries.length} anime in your collection</p>
            </div>

            <div className="filter-bar">
                {(['all', 'watching', 'completed', 'plan_to_watch'] as const).map((s) => (
                    <button
                        key={s}
                        className={`filter-btn ${filter === s ? 'active' : ''}`}
                        onClick={() => setFilter(s)}
                    >
                        {s === 'all' ? 'All' : statusLabels[s]}
                        <span className="filter-count">{statusCounts[s]}</span>
                    </button>
                ))}
            </div>

            {filteredEntries.length > 0 ? (
                <div className="mylist-grid">
                    {filteredEntries.map((entry) => (
                        <div key={entry.id} className="mylist-card-wrapper">
                            <AnimeCard
                                id={entry.anime_id}
                                title={entry.title}
                                imageUrl={entry.image_url}
                                status={entry.status}
                                rating={entry.rating}
                                showListBadge
                            />
                            {entry.review && (
                                <div className="review-preview">
                                    <p>"{entry.review}"</p>
                                </div>
                            )}
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(entry.id);
                                }}
                            >
                                🗑 Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No anime here yet</h3>
                    <p>
                        {filter === 'all'
                            ? 'Start by searching and adding some anime!'
                            : `No anime with status "${statusLabels[filter] || filter}".`}
                    </p>
                </div>
            )}
        </div>
    );
}

export default MyList;
