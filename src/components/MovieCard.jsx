import React from 'react'

const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language}}) => {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <div className="mt-4">
                <h3>{title}</h3>
            
            <div className="content">
                <div className="rating">
                    <img src="src/assets/star.svg" alt="Star Icon" />  
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>•</span>
                <p className="language text-white">{original_language ? original_language.toUpperCase() : 'N/A'}</p>

                <span>•</span>
                <p className="release-date text-white">{release_date ? new Date(release_date).getFullYear() : 'N/A'}</p>
            </div>
        </div>
        </div>
    )
}

export default MovieCard
