import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AnimeDetail {
    mal_id: number;
    title: string;
    title_japanese: string;
    synopsis: string;
    score: number;
    episodes: number;
    status: string;
    rating: string;
    genres: { name: string }[];
    images: {
        jpg: {
            large_image_url: string;
        };
    };
    year: number;
    studios: { name: string }[];
}

function AnimeDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [anime, setAnime] = useState<AnimeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [formStatus, setFormStatus] = useState('plan_to_watch');
    const [formRating, setFormRating] = useState(0);
    const [formReview, setFormReview] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
                setAnime(res.data.data);
            } catch (err) {
                console.error('Failed to fetch anime details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnime();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!anime) return;

        setSubmitting(true);
        try {
            const res = await axios.post('http://localhost:3001/api/mylist', {
                anime_id: anime.mal_id,
                title: anime.title,
                image_url: anime.images.jpg.large_image_url,
                status: formStatus,
                rating: formRating,
                review: formReview,
            });
            setSubmitMessage(res.data.message);
            setTimeout(() => setSubmitMessage(''), 3000);
        } catch (err) {
            console.error('Failed to add to list:', err);
            setSubmitMessage('Failed to add. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading anime details...</p>
            </div>
        );
    }

    if (!anime) {
        return (
            <div className="empty-state">
                <p>Anime not found.</p>
                <button onClick={() => navigate('/')} className="back-button">
                    ← Back to Search
                </button>
            </div>
        );
    }

    return (
        <div className="detail-page">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>
            <div className="detail-content">
                <div className="detail-image-section">
                    <img
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title}
                        className="detail-image"
                    />
                </div>
                <div className="detail-info-section">
                    <h1 className="detail-title">{anime.title}</h1>
                    {anime.title_japanese && (
                        <p className="detail-japanese-title">{anime.title_japanese}</p>
                    )}

                    <div className="detail-tags">
                        {anime.genres.map((g) => (
                            <span key={g.name} className="tag">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="detail-stats">
                        {anime.score > 0 && (
                            <div className="stat-item">
                                <span className="stat-label">Score</span>
                                <span className="stat-value">⭐ {anime.score}</span>
                            </div>
                        )}
                        {anime.episodes > 0 && (
                            <div className="stat-item">
                                <span className="stat-label">Episodes</span>
                                <span className="stat-value">📺 {anime.episodes}</span>
                            </div>
                        )}
                        {anime.year > 0 && (
                            <div className="stat-item">
                                <span className="stat-label">Year</span>
                                <span className="stat-value">📅 {anime.year}</span>
                            </div>
                        )}
                        {anime.studios?.length > 0 && (
                            <div className="stat-item">
                                <span className="stat-label">Studio</span>
                                <span className="stat-value">🎨 {anime.studios[0].name}</span>
                            </div>
                        )}
                    </div>

                    <div className="detail-synopsis">
                        <h3>Synopsis</h3>
                        <p>{anime.synopsis || 'No synopsis available.'}</p>
                    </div>

                    <div className="add-to-list-section">
                        <h3>Add to My List</h3>
                        <form onSubmit={handleSubmit} className="add-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        value={formStatus}
                                        onChange={(e) => setFormStatus(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="plan_to_watch">Plan to Watch</option>
                                        <option value="watching">Watching</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating</label>
                                    <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className={`star-btn ${star <= formRating ? 'active' : ''}`}
                                                onClick={() => setFormRating(star === formRating ? 0 : star)}
                                            >
                                                {star <= formRating ? '★' : '☆'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="review">Review / Notes</label>
                                <textarea
                                    id="review"
                                    value={formReview}
                                    onChange={(e) => setFormReview(e.target.value)}
                                    placeholder="Write your thoughts about this anime..."
                                    className="form-textarea"
                                    rows={3}
                                />
                            </div>
                            <button type="submit" className="submit-button" disabled={submitting}>
                                {submitting ? 'Saving...' : '+ Add to My List'}
                            </button>
                            {submitMessage && (
                                <p className={`submit-message ${submitMessage.includes('Failed') ? 'error' : 'success'}`}>
                                    {submitMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimeDetailPage;
