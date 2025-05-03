import React from 'react';

function SongDetailCard({ song, jumpToNextInGenre, jumpToNextInYear, onClose }) {
  return (
    <div style={{
      position: 'absolute',
      top: '100px',
      right: '40px',
      width: '300px',
      padding: '20px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 10
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: '#f0f0f0',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
        ← Back
      </button>

      <h3 style={{ marginTop: '30px' }}>{song.title}</h3>
      <p><strong>Artist:</strong> {song.artist}</p>
      <p><strong>Year:</strong> {song.year}</p>
      <p><strong>Genre:</strong> {song.genre}</p>

      <button
        onClick={() => jumpToNextInGenre(song)}
        style={{ width: '100%', marginTop: '10px', padding: '8px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>
        Next in Genre
      </button>
      <button
        onClick={() => jumpToNextInYear(song)}
        style={{ width: '100%', marginTop: '10px', padding: '8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
        Next in Year
      </button>
    </div>
  );
}

export default SongDetailCard;
