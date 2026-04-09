import { useNavigate } from 'react-router-dom';

interface AnimeCardProps {
    id: number;
    title: string;
    imageUrl: string;
    score?: number;
    episodes?: number;
    status?: string;
    rating?: number;
    showListBadge?: boolean;
}

function AnimeCard({ id, title, imageUrl, score, episodes, status, rating, showListBadge }: AnimeCardProps) {
    const navigate = useNavigate();

    const statusLabels: Record<string, string> = {
        watching: 'Watching',
        completed: 'Completed',
        plan_to_watch: 'Plan to Watch',
    };

    return (
        <div className="anime-card" onClick={() => navigate(`/anime/${id}`)}>
            <div className="anime-card-image-wrapper">
                <img src={imageUrl} alt={title} className="anime-card-image" />
                <div className="anime-card-overlay">
                    <span className="view-detail">View Details →</span>
                </div>
                {showListBadge && status && (
                    <span className={`status-badge status-${status}`}>
                        {statusLabels[status] || status}
                    </span>
                )}
            </div>
            <div className="anime-card-info">
                <h3 className="anime-card-title">{title}</h3>
                <div className="anime-card-meta">
                    {score !== undefined && score > 0 && (
                        <span className="meta-item">
                            ⭐ {score}
                        </span>
                    )}
                    {episodes !== undefined && episodes > 0 && (
                        <span className="meta-item">
                            📺 {episodes} eps
                        </span>
                    )}
                    {rating !== undefined && rating > 0 && (
                        <span className="meta-item">
                            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnimeCard;
