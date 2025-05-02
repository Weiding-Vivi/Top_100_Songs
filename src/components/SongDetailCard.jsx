import React from 'react';

function SongDetailCard({ song }) {
    return (
        <div style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            background: '#f9f9f9',
            width: '300px'
        }}>
            <h3>{song.title}</h3>
            <p><strong>Artist:</strong> {song.artist}</p>
            <p><strong>Year:</strong> {song.year}</p>
            <p><strong>Genre:</strong> {song.genre}</p>
        </div>
    );
}

export default SongDetailCard;